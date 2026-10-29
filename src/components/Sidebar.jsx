import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({
  activeTab,
  setActiveTab,
  savedCount,
  isOpen,
  onClose,
  onViewLanding,
}) {
  const { user, openAuthModal, signOut } = useAuth();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'grid_view',
    },
    {
      id: 'pesquisar-tendencias',
      label: 'Pesquisar tendências',
      icon: 'trending_up',
    },
    {
      id: 'gerar-ideias',
      label: 'Gerar ideias de PDFs',
      icon: 'auto_awesome',
    },
    {
      id: 'ideias-salvas',
      label: 'Ideias salvas',
      icon: 'bookmark_border',
      badge: savedCount,
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: 'settings',
    },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onClose) onClose();
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

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-on-surface/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-surface dark:bg-slate-900 border-r border-outline-variant/30 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo & Brand Header */}
          <div className="h-16 flex items-center justify-between px-space-md border-b border-outline-variant/30 dark:border-slate-800">
            <div
              className="flex items-center gap-space-sm cursor-pointer select-none"
              onClick={() => handleSelectTab('dashboard')}
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm shadow-primary/30">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface dark:text-slate-100 font-bold tracking-tight">
                  TrendPDF Studio
                </span>
                <span className="text-[10px] uppercase font-metric-mono font-bold tracking-wider text-primary dark:text-primary-fixed-dim">
                  AI Intelligence
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white rounded-lg hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
              aria-label="Fechar menu de navegação"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-space-sm space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all text-left font-label-md text-label-md min-h-[44px] ${
                    isActive
                      ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
                      : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 hover:text-on-surface dark:hover:text-slate-100'
                  }`}
                  type="button"
                >
                  <div className="flex items-center gap-space-sm">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isActive ? 'text-on-primary' : 'text-on-surface-variant dark:text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-metric-mono font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-surface-container dark:bg-slate-800 text-primary dark:text-primary-fixed-dim'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Link para visualização da Landing Page / Apresentação */}
            {onViewLanding && (
              <button
                onClick={() => {
                  if (onClose) onClose();
                  onViewLanding();
                }}
                className="w-full flex items-center justify-between px-space-md py-space-sm rounded-lg text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 hover:text-on-surface dark:hover:text-slate-100 transition-all text-left font-label-md text-label-md min-h-[44px]"
                type="button"
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    storefront
                  </span>
                  <span className="text-sm">Página Inicial</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant/60">
                  open_in_new
                </span>
              </button>
            )}
          </nav>
        </div>

        {/* User Profile Card */}
        <div className="p-space-md border-t border-outline-variant/30 dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900">
          <div className="flex items-center justify-between p-space-xs rounded-lg hover:bg-surface-container dark:hover:bg-slate-800 transition-colors">
            <div
              className="flex items-center gap-space-sm min-w-0 cursor-pointer flex-1"
              onClick={() => handleSelectTab('configuracoes')}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim flex items-center justify-center font-bold text-sm flex-shrink-0">
                {initials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface dark:text-slate-100 truncate font-semibold text-sm">
                  {user?.name || 'Usuário'}
                </span>
                <span className="font-body-sm text-body-sm text-secondary dark:text-emerald-400 truncate font-medium flex items-center gap-1 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-emerald-400"></span>
                  {user?.plan === 'enterprise' ? 'Enterprise' : 'Plano Pro'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <button
                onClick={() => handleSelectTab('configuracoes')}
                className="p-1.5 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Configurações da conta"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
              <button
                onClick={async () => {
                  if (onClose) onClose();
                  await signOut();
                }}
                className="p-1.5 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                title="Encerrar sessão"
                type="button"
                aria-label="Encerrar sessão"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
