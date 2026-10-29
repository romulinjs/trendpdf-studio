import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header({
  onGlobalSearch,
  onToggleMobileMenu,
  onNavigate,
  theme,
  onThemeChange,
  onShowToast,
}) {
  const { user, signOut, openAuthModal, isConfigured } = useAuth();
  const [query, setQuery] = useState('');
  const [showNotice, setShowNotice] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileMenuRef = useRef(null);
  const noticeMenuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (noticeMenuRef.current && !noticeMenuRef.current.contains(event.target)) {
        setShowNotice(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onGlobalSearch) {
      onGlobalSearch(query.trim());
    }
  };

  const handleLogout = async () => {
    setShowProfileMenu(false);
    await signOut();
    if (onShowToast) {
      onShowToast({
        type: 'info',
        title: 'Sessão Encerrada',
        message: 'Você se desconectou com sucesso da sua conta.',
      });
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'AM';

  const creditsBalance = user?.aiCreditsBalance ?? 100;
  const creditsPercentage = Math.min(100, Math.max(0, creditsBalance));

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface dark:bg-[#0b0f19] border-b border-outline-variant/30 dark:border-slate-800 z-40 px-3 sm:px-6 lg:px-space-lg flex items-center justify-between gap-2 sm:gap-3 transition-colors">
      {/* Mobile Hamburger & Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl">
        {/* Hamburger Menu Toggle (Mobile Only) */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 -ml-1 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
          type="button"
          aria-label="Abrir menu de navegação"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center w-full bg-surface-container-lowest dark:bg-slate-800/80 border border-outline-variant/40 dark:border-slate-700 rounded-lg px-3 py-1.5 sm:py-2 gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 text-[18px] flex-shrink-0">
              search
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full min-w-0 bg-transparent border-none outline-none font-body-sm text-base sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/60 dark:placeholder:text-slate-500"
              placeholder="Buscar mercados, nichos, palavras-chave..."
              type="text"
            />
            <kbd className="hidden sm:inline-flex items-center font-metric-mono text-on-surface-variant dark:text-slate-400 bg-surface-container dark:bg-slate-700/60 px-1.5 py-0.5 rounded text-[10px] select-none flex-shrink-0">
              ↵ Enter
            </kbd>
          </div>
        </form>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Supabase / Local Status Pill */}
        <div
          title={isConfigured ? 'Supabase PostgreSQL conectado' : 'Armazenamento e Auth em modo local/demo'}
          className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 font-metric-mono text-xs border border-transparent dark:border-slate-700/50"
        >
          <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-secondary animate-pulse' : 'bg-emerald-500'}`}></span>
          <span>{isConfigured ? 'Supabase Online' : 'Engine v2.6 Local'}</span>
        </div>

        {/* Notifications */}
        <div className="relative" ref={noticeMenuRef}>
          <button
            onClick={() => setShowNotice(!showNotice)}
            className="p-2 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg transition-colors relative flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            type="button"
            title="Notificações"
            aria-label="Abrir notificações"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          {showNotice && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-surface-container-lowest dark:bg-slate-800 rounded-xl shadow-xl border border-outline-variant/30 dark:border-slate-700 p-4 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-slate-700">
                <span className="text-xs font-bold text-on-surface dark:text-slate-100">Notificações</span>
                <span className="text-[11px] text-primary font-medium cursor-pointer hover:underline">
                  Marcar lidas
                </span>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-surface-container-low dark:bg-slate-900/60 flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5 flex-shrink-0">
                    trending_up
                  </span>
                  <div>
                    <strong className="block text-on-surface dark:text-slate-200 font-semibold">Novo pico detectado!</strong>
                    <span className="text-on-surface-variant dark:text-slate-400 text-[11px]">
                      O nicho "Educação Financeira Infantil" subiu +280% hoje.
                    </span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg hover:bg-surface-container dark:hover:bg-slate-700/50 flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] mt-0.5 flex-shrink-0">
                    auto_awesome
                  </span>
                  <div>
                    <strong className="block text-on-surface dark:text-slate-200 font-semibold">Créditos de IA</strong>
                    <span className="text-on-surface-variant dark:text-slate-400 text-[11px]">
                      {creditsBalance} créditos restantes no seu ciclo.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-[1px] bg-outline-variant/30 dark:bg-slate-700 hidden sm:block"></div>

        {/* User Profile Avatar with Interactive Dropdown Menu */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-primary/40 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            aria-label="Menu do perfil de usuário"
            aria-expanded={showProfileMenu}
            type="button"
          >
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
              {initials}
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-surface-container-lowest dark:bg-slate-800 rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-slate-700 p-4 z-50 animate-fadeIn space-y-3">
              {/* Profile Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-surface-container dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm shadow flex-shrink-0">
                  {initials}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-bold text-on-surface dark:text-slate-100 truncate">
                    {user?.name || 'Ana Martins'}
                  </span>
                  <span className="text-xs text-on-surface-variant dark:text-slate-400 truncate">
                    {user?.email || 'ana.martins@trendpdf.studio'}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 w-max px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container dark:bg-emerald-950/60 text-on-secondary-container dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      {user?.plan === 'enterprise' ? 'Plano Enterprise' : 'Plano Pro'}
                    </span>
                    {user?.isDemo && (
                      <span className="text-[10px] text-amber-500 font-medium">Modo Demo</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Login / Switch Account CTA */}
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  openAuthModal();
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-indigo-300 hover:bg-primary/15 transition-colors text-xs font-semibold"
                type="button"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  <span>{user?.isDemo ? 'Fazer Login / Cadastrar' : 'Trocar de Conta'}</span>
                </div>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>

              {/* Theme Selector (Claro / Escuro / Sistema) */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider block">
                  Tema da Interface
                </span>
                <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-low dark:bg-slate-900 rounded-lg">
                  <button
                    onClick={() => onThemeChange('light')}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-md text-[11px] font-semibold transition-all ${
                      theme === 'light'
                        ? 'bg-surface-container-lowest dark:bg-slate-800 text-primary shadow-sm'
                        : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
                    }`}
                    type="button"
                    title="Tema Claro"
                  >
                    <span className="material-symbols-outlined text-[16px]">light_mode</span>
                    <span>Claro</span>
                  </button>
                  <button
                    onClick={() => onThemeChange('dark')}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-md text-[11px] font-semibold transition-all ${
                      theme === 'dark'
                        ? 'bg-surface-container-lowest dark:bg-slate-800 text-primary shadow-sm'
                        : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
                    }`}
                    type="button"
                    title="Tema Escuro"
                  >
                    <span className="material-symbols-outlined text-[16px]">dark_mode</span>
                    <span>Escuro</span>
                  </button>
                  <button
                    onClick={() => onThemeChange('system')}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-md text-[11px] font-semibold transition-all ${
                      theme === 'system'
                        ? 'bg-surface-container-lowest dark:bg-slate-800 text-primary shadow-sm'
                        : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
                    }`}
                    type="button"
                    title="Seguir o tema do sistema operacional"
                  >
                    <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
                    <span>Auto</span>
                  </button>
                </div>
              </div>

              {/* Menu Navigation Items */}
              <div className="space-y-1 pt-1 border-t border-surface-container dark:border-slate-700 text-xs">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onNavigate) onNavigate('configuracoes');
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-700/60 hover:text-on-surface dark:hover:text-white transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">settings</span>
                  <span>Configurações & Chaves de IA</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onNavigate) onNavigate('ideias-salvas');
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-700/60 hover:text-on-surface dark:hover:text-white transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">bookmark</span>
                  <span>Biblioteca Editorial Salva</span>
                </button>
              </div>

              {/* AI Credits Meter */}
              <div className="p-2.5 rounded-lg bg-surface-container-low dark:bg-slate-900 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-on-surface-variant dark:text-slate-400 font-medium">Créditos de IA</span>
                  <span className="font-bold text-primary">{creditsBalance} / 100</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${creditsPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="pt-1 border-t border-surface-container dark:border-slate-700">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Encerrar Sessão</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
