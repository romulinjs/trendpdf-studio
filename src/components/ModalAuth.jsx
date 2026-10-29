import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ModalAuth({ isOpen, onClose, onShowToast }) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, isConfigured, authMode, loginAsDemo } = useAuth();
  const [isSignUp, setIsSignUp] = useState(authMode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsSignUp(authMode === 'signup');
  }, [authMode, isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
        if (onShowToast) {
          onShowToast({
            type: 'success',
            title: 'Conta criada com sucesso!',
            message: isConfigured
              ? 'Verifique seu e-mail caso a confirmação esteja ativada no Supabase.'
              : 'Usuário cadastrado com 100 créditos no ambiente local!',
          });
        }
      } else {
        await signInWithEmail(email, password);
        if (onShowToast) {
          onShowToast({
            type: 'success',
            title: 'Autenticado com sucesso!',
            message: 'Bem-vindo(a) de volta ao TrendPDF Studio.',
          });
        }
      }
      onClose();
    } catch (err) {
      console.error('Erro de autenticação:', err);
      setErrorMessage(
        err.message || 'Falha ao autenticar. Verifique suas credenciais e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await signInWithGoogle();
      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'Conectado com Google',
          message: 'Sua sessão foi iniciada com sucesso.',
        });
      }
      onClose();
    } catch (err) {
      console.error('Erro ao conectar via Google:', err);
      setErrorMessage(err.message || 'Falha ao autenticar com Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 dark:bg-black/75 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-surface-container-lowest dark:bg-slate-800 rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-slate-700 max-w-md w-full p-6 sm:p-8 space-y-5 animate-scaleUp transition-colors relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Fechar janela de login"
          className="absolute top-5 right-5 p-1.5 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white rounded-lg hover:bg-surface-container dark:hover:bg-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <h2 id="auth-modal-title" className="text-xl font-bold text-on-surface dark:text-slate-100">
            {isSignUp ? 'Criar Nova Conta' : 'Acessar o TrendPDF Studio'}
          </h2>
          <p className="text-xs text-on-surface-variant dark:text-slate-400 max-w-xs">
            {isSignUp
              ? 'Comece agora com 100 créditos gratuitos de IA preditiva e sincronização na nuvem.'
              : 'Entre para acessar suas ideias salvas, créditos e briefings em PDF.'}
          </p>
        </div>

        {/* Cloud / Local Badge */}
        <div className="flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-surface-container dark:bg-slate-700/60 text-[11px] text-on-surface-variant dark:text-slate-300 w-max mx-auto font-medium">
          <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-secondary animate-pulse' : 'bg-amber-400'}`}></span>
          <span>{isConfigured ? 'Supabase PostgreSQL Conectado' : 'Modo Demonstração Local Ativo'}</span>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-outline-variant/50 dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-900/60 hover:bg-surface-container-low dark:hover:bg-slate-700/60 text-xs sm:text-sm font-semibold text-on-surface dark:text-slate-100 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continuar com o Google</span>
        </button>

        {/* Demo Login Button */}
        <button
          onClick={() => {
            loginAsDemo();
            if (onShowToast) {
              onShowToast({
                type: 'info',
                title: 'Modo Demonstração',
                message: 'Você entrou como Ana Martins (Plano Pro com 84 créditos).',
              });
            }
            onClose();
          }}
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-outline-variant/30 dark:border-slate-700 bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-xs font-semibold text-on-surface dark:text-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">play_circle</span>
          <span>Acessar Demonstração Rápida (1 Clique)</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-outline-variant/30 dark:bg-slate-700"></div>
          <span className="text-[11px] uppercase tracking-wider text-on-surface-variant dark:text-slate-400 font-medium">
            ou com e-mail
          </span>
          <div className="flex-1 h-[1px] bg-outline-variant/30 dark:bg-slate-700"></div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-rose-950/50 border border-red-200 dark:border-rose-900/60 text-xs text-red-600 dark:text-rose-300 flex items-start gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px] flex-shrink-0">error</span>
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface dark:text-slate-200">
                Seu Nome Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos Eduardo"
                className="w-full bg-surface-container-low dark:bg-slate-900/70 border border-outline-variant/40 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface dark:text-slate-200">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="w-full bg-surface-container-low dark:bg-slate-900/70 border border-outline-variant/40 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface dark:text-slate-200">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo de 6 caracteres"
                className="w-full bg-surface-container-low dark:bg-slate-900/70 border border-outline-variant/40 dark:border-slate-700 rounded-xl px-3.5 py-2 pr-10 text-xs sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-slate-200 p-1 rounded"
                title={showPassword ? 'Ocultar senha' : 'Ver senha'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{isSignUp ? 'Cadastrar e Receber 100 Créditos' : 'Entrar no Studio'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle Sign In / Sign Up */}
        <div className="text-center pt-2 border-t border-surface-container dark:border-slate-700">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage('');
            }}
            type="button"
            className="text-xs text-primary hover:underline font-semibold"
          >
            {isSignUp
              ? 'Já tem uma conta? Clique para entrar'
              : 'Não tem conta? Cadastre-se e ganhe 100 créditos'}
          </button>
        </div>
      </div>
    </div>
  );
}

