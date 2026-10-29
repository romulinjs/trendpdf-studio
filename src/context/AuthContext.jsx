import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const configured = isSupabaseConfigured();

  // Carrega a sessão inicial do Supabase
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      // 1. Purga imediata de qualquer resquício de usuário demo salvo em cache anterior
      try {
        const rawSaved = localStorage.getItem('trendpdf_current_user');
        if (rawSaved) {
          const parsed = JSON.parse(rawSaved);
          if (parsed?.isDemo || parsed?.id?.includes('demo')) {
            localStorage.removeItem('trendpdf_current_user');
          }
        }
      } catch {
        localStorage.removeItem('trendpdf_current_user');
      }

      if (configured && supabase) {
        try {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          if (currentSession?.user && mounted) {
            setSession(currentSession);
            await fetchUserProfile(currentSession.user);
          } else if (mounted) {
            // Sem sessão ativa no Supabase -> SEMPRE exibe a Landing Page
            localStorage.removeItem('trendpdf_current_user');
            setSession(null);
            setUser(null);
          }
        } catch (err) {
          console.warn('Erro ao conectar ao Supabase Auth:', err);
          if (mounted) {
            localStorage.removeItem('trendpdf_current_user');
            setSession(null);
            setUser(null);
          }
        }
      } else {
        // Modo Local (sem Supabase configurado)
        if (mounted) {
          const savedUser = localStorage.getItem('trendpdf_current_user');
          if (savedUser) {
            const parsed = JSON.parse(savedUser);
            if (!parsed?.isDemo) {
              setUser(parsed);
            } else {
              localStorage.removeItem('trendpdf_current_user');
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
      }

      if (mounted) setLoading(false);
    }

    initAuth();

    // Listener de eventos de autenticação do Supabase
    let authListener = null;
    if (configured && supabase) {
      const { data: subscription } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user);
        } else {
          localStorage.removeItem('trendpdf_current_user');
          setUser(null);
        }
      });
      authListener = subscription;
    }

    return () => {
      mounted = false;
      if (authListener?.subscription?.unsubscribe) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [configured]);

  // Busca dados de perfil do usuário (créditos, plano, etc.)
  async function fetchUserProfile(supabaseUser) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Erro ao buscar perfil no Supabase:', error);
      }

      const userData = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name: profile?.name || supabaseUser.user_metadata?.full_name || supabaseUser.email.split('@')[0],
        avatarUrl: profile?.avatar_url || supabaseUser.user_metadata?.avatar_url || null,
        plan: profile?.plan || 'pro',
        aiCreditsBalance: profile?.ai_credits_balance ?? 100,
        aiCreditsUsed: profile?.ai_credits_used ?? 0,
        isDemo: false,
      };

      setUser(userData);
      localStorage.setItem('trendpdf_current_user', JSON.stringify(userData));
    } catch (err) {
      console.error('Falha ao sincronizar perfil do usuário:', err);
    }
  }

  // 1. Login com E-mail e Senha
  const signInWithEmail = async (email, password) => {
    if (configured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data?.user) {
        await fetchUserProfile(data.user);
      }
      return data;
    } else {
      // Fallback Local
      const localUser = {
        id: 'usr-local-' + Date.now(),
        email,
        name: email.split('@')[0],
        avatarUrl: null,
        plan: 'pro',
        aiCreditsBalance: 100,
        aiCreditsUsed: 0,
        isDemo: false,
      };
      setUser(localUser);
      localStorage.setItem('trendpdf_current_user', JSON.stringify(localUser));
      return { user: localUser };
    }
  };

  // 2. Cadastro com E-mail e Senha
  const signUpWithEmail = async (email, password, name) => {
    if (configured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      if (error) throw error;
      if (data?.user) {
        await fetchUserProfile(data.user);
      }
      return data;
    } else {
      // Fallback Local
      const localUser = {
        id: 'usr-local-' + Date.now(),
        email,
        name: name || email.split('@')[0],
        avatarUrl: null,
        plan: 'pro',
        aiCreditsBalance: 100,
        aiCreditsUsed: 0,
        isDemo: false,
      };
      setUser(localUser);
      localStorage.setItem('trendpdf_current_user', JSON.stringify(localUser));
      return { user: localUser };
    }
  };

  // 3. Login com Google OAuth
  const signInWithGoogle = async () => {
    if (configured && supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      return data;
    } else {
      // Simulação Local de Google Login
      const googleUser = {
        id: 'usr-google-' + Date.now(),
        email: 'usuario.google@gmail.com',
        name: 'Usuário Google',
        avatarUrl: null,
        plan: 'pro',
        aiCreditsBalance: 100,
        aiCreditsUsed: 0,
        isDemo: false,
      };
      setUser(googleUser);
      localStorage.setItem('trendpdf_current_user', JSON.stringify(googleUser));
      return { user: googleUser };
    }
  };

  // 4. Logout / Desconectar
  const signOut = async () => {
    if (configured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Erro ao deslogar no Supabase:', e);
      }
    }
    localStorage.removeItem('trendpdf_current_user');
    setUser(null);
    setSession(null);
  };

  // 5. Deduzir Crédito de IA (após geração preditiva)
  const deductAiCredit = async (amount = 1) => {
    if (!user) return;

    const newBalance = Math.max(0, user.aiCreditsBalance - amount);
    const newUsed = user.aiCreditsUsed + amount;

    const updatedUser = {
      ...user,
      aiCreditsBalance: newBalance,
      aiCreditsUsed: newUsed,
    };
    setUser(updatedUser);
    localStorage.setItem('trendpdf_current_user', JSON.stringify(updatedUser));

    if (configured && supabase && !user.isDemo) {
      try {
        await supabase
          .from('profiles')
          .update({
            ai_credits_balance: newBalance,
            ai_credits_used: newUsed,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        await supabase.from('ai_credit_logs').insert([
          {
            user_id: user.id,
            amount: -amount,
            action: 'geracao_ideias_preditivas',
            details: `Dedução de ${amount} crédito(s) para modelagem editorial.`,
          },
        ]);
      } catch (err) {
        console.warn('Erro ao atualizar créditos no Supabase:', err);
      }
    }
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: configured,
        authMode,
        setAuthMode,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        deductAiCredit,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um <AuthProvider>');
  }
  return context;
}
