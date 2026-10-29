import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ModalAuth({ isOpen, onClose, onShowToast }) {
  const { signInWithEmail, signUpWithEmail, isConfigured, authMode } = useAuth();
  const [isSignUp, setIsSignUp] = useState(authMode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsSignUp(authMode === 'signup');
    setEmail('');
    setPassword('');
    setName('');
    setErrorMessage('');
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

  const handleToggleMode = () => {
    setIsSignUp((prev) => !prev);
    setEmail('');
    setPassword('');
    setName('');
    setErrorMessage('');
  };

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
              ? 'Conta criada! Se o e-mail de confirmação estiver ativo no Supabase, verifique sua caixa de entrada.'
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
      const rawMsg = err.message || '';
      const lowerMsg = rawMsg.toLowerCase();
      if (
        lowerMsg.includes('rate limit') ||
        lowerMsg.includes('over_email_send_rate_limit') ||
        lowerMsg.includes('rate_limit')
      ) {
        setErrorMessage(
          'Limite de envio de e-mails do Supabase atingido. Para permitir cadastros imediatos e ilimitados sem aguardar e-mail, desative a opção "Confirm email" em Authentication > Providers > Email no painel do Supabase.'
        );
      } else if (
        lowerMsg.includes('invalid login credentials') ||
        lowerMsg.includes('invalid_grant')
      ) {
        setErrorMessage('E-mail ou senha incorretos. Verifique suas credenciais.');
      } else if (lowerMsg.includes('user already registered')) {
        setErrorMessage('Este e-mail já está cadastrado. Alterne para a opção "Entrar" abaixo.');
      } else {
        setErrorMessage(rawMsg || 'Falha ao autenticar. Verifique suas credenciais e tente novamente.');
      }
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
          <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-secondary animate-pulse' : 'bg-primary'}`}></span>
          <span>{isConfigured ? 'Supabase PostgreSQL Conectado' : 'Autenticação de Usuário'}</span>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-rose-950/50 border border-red-200 dark:border-rose-900/60 text-xs text-red-600 dark:text-rose-300 flex items-start gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px] flex-shrink-0">error</span>
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3.5">
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
                autoComplete="name"
                className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant/40 dark:border-slate-700 rounded-xl px-3.5 py-2 text-base sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
              autoComplete={isSignUp ? 'new-email' : 'email'}
              className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant/40 dark:border-slate-700 rounded-xl px-3.5 py-2 text-base sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant/40 dark:border-slate-700 rounded-xl px-3.5 py-2 pr-10 text-base sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
            onClick={handleToggleMode}
            type="button"
            className="text-xs text-primary dark:text-indigo-400 hover:text-primary-hover dark:hover:text-indigo-300 hover:underline font-semibold transition-colors"
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

