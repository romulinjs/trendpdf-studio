import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import ModalConfirmacao from '../components/ModalConfirmacao';

export default function Configuracoes({ onResetAllData, onShowToast, theme, onThemeChange }) {
  const { user, isConfigured, openAuthModal, signOut } = useAuth();
  const [settings, setSettings] = useState(storageService.getSettings());
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    storageService.saveSettings(settings);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Configurações Salvas',
        message: 'Suas preferências editoriais e integrações foram atualizadas.',
      });
    }
  };

  const handleConfirmReset = () => {
    setShowResetModal(false);
    onResetAllData();
    setSettings(storageService.getSettings());
    if (onShowToast) {
      onShowToast({
        type: 'info',
        title: 'Dados Restaurados',
        message: 'A base de demonstração foi restaurada com sucesso.',
      });
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg sm:gap-space-xl pb-16 max-w-4xl">
      {/* 1. Header with Breadcrumb */}
      <div className="space-y-1.5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-on-surface-variant dark:text-slate-400 font-medium">
          <span>Sistema</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary dark:text-primary-fixed-dim font-semibold">Configurações & Integrações</span>
        </nav>

        <h1 className="font-headline-xl text-xl sm:text-2xl lg:text-3xl font-bold text-on-surface dark:text-slate-100 tracking-tight">
          Configurações & Integrações
        </h1>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed">
          Gerencie suas preferências editoriais, chaves de inteligência artificial, banco de dados e autenticação.
        </p>
      </div>

      {/* 2. Formulário de Configurações */}
      <form onSubmit={handleSave} className="space-y-4 sm:space-y-6">
        {/* Backend, Banco de Dados & Autenticação */}
        <section className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl p-4 sm:p-6 shadow-sm border border-outline-variant/30 dark:border-slate-700 space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-2.5 border-b border-surface-container dark:border-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-primary dark:text-primary-fixed-dim flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">database</span>
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100">
                  Backend, Banco de Dados & Autenticação
                </h2>
                <p className="text-[11px] sm:text-xs text-on-surface-variant dark:text-slate-400">
                  PostgreSQL na nuvem via Supabase com Row Level Security e persistência local SQLite.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isConfigured ? 'bg-secondary animate-pulse' : 'bg-emerald-500'}`}></span>
              <span className="text-xs font-semibold text-on-surface dark:text-slate-200">
                {isConfigured ? 'Supabase Conectado' : 'Ambiente Local Ativo'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-surface-container-low dark:bg-slate-900/60 border border-outline-variant/20 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface dark:text-slate-200">Usuário Autenticado</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container dark:bg-emerald-950/60 text-secondary dark:text-emerald-400">
                  {user?.plan === 'enterprise' ? 'Plano Enterprise' : 'Plano Pro'}
                </span>
              </div>
              <div className="text-xs text-on-surface-variant dark:text-slate-400 space-y-0.5">
                <p className="font-semibold text-on-surface dark:text-slate-200">{user?.name || 'Ana Martins'}</p>
                <p>{user?.email || 'ana.martins@trendpdf.studio'}</p>
                <p className="text-[11px] text-primary dark:text-indigo-300 font-medium pt-1">
                  Saldo: {user?.aiCreditsBalance ?? 100} créditos disponíveis
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-all shadow-sm"
                >
                  {user?.isDemo ? 'Entrar / Cadastrar Conta' : 'Trocar de Conta'}
                </button>
                {!user?.isDemo && (
                  <button
                    type="button"
                    onClick={signOut}
                    className="px-3 py-1.5 rounded-lg border border-outline-variant/40 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-all"
                  >
                    Sair
                  </button>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low dark:bg-slate-900/60 border border-outline-variant/20 dark:border-slate-700/60 space-y-2 text-xs">
              <span className="font-bold text-on-surface dark:text-slate-200 block">Esquema & Migração SQL</span>
              <p className="text-on-surface-variant dark:text-slate-400 text-[11px] leading-relaxed">
                O arquivo <code className="px-1 py-0.5 bg-surface-container dark:bg-slate-800 rounded font-metric-mono text-primary">supabase_schema.sql</code> na raiz contém todo o DDL com tabelas relacionais, RLS, triggers e seed de dados.
              </p>
              <p className="text-on-surface-variant dark:text-slate-400 text-[11px] leading-relaxed">
                Também configurado o schema do Prisma em <code className="px-1 py-0.5 bg-surface-container dark:bg-slate-800 rounded font-metric-mono text-primary">prisma/schema.prisma</code> pronto para SQLite ou Postgres.
              </p>
            </div>
          </div>
        </section>

        {/* Aparência & Tema (Claro / Escuro / Sistema) */}
        <section className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl p-4 sm:p-6 shadow-sm border border-outline-variant/30 dark:border-slate-700 space-y-4 transition-colors">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-surface-container dark:border-slate-700">
            <span className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-primary dark:text-primary-fixed-dim flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">palette</span>
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100">
                Aparência & Tema
              </h2>
              <p className="text-[11px] sm:text-xs text-on-surface-variant dark:text-slate-400">
                Escolha o modo de visualização ou acompanhe automaticamente o sistema operacional.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Opção Claro */}
            <button
              type="button"
              onClick={() => onThemeChange('light')}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                theme === 'light'
                  ? 'border-primary bg-primary-fixed/30 dark:bg-indigo-950/40 ring-2 ring-primary/20'
                  : 'border-outline-variant/40 dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-800'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">light_mode</span>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-on-surface dark:text-slate-100 block">Modo Claro</span>
                <span className="text-[11px] text-on-surface-variant dark:text-slate-400">Paleta nítida padrão</span>
              </div>
            </button>

            {/* Opção Escuro */}
            <button
              type="button"
              onClick={() => onThemeChange('dark')}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                theme === 'dark'
                  ? 'border-primary bg-primary-fixed/30 dark:bg-indigo-950/40 ring-2 ring-primary/20'
                  : 'border-outline-variant/40 dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-800'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-indigo-300 flex items-center justify-center flex-shrink-0 border border-slate-700">
                <span className="material-symbols-outlined text-[22px]">dark_mode</span>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-on-surface dark:text-slate-100 block">Modo Escuro</span>
                <span className="text-[11px] text-on-surface-variant dark:text-slate-400">Alto contraste noturno</span>
              </div>
            </button>

            {/* Opção Sistema */}
            <button
              type="button"
              onClick={() => onThemeChange('system')}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                theme === 'system'
                  ? 'border-primary bg-primary-fixed/30 dark:bg-indigo-950/40 ring-2 ring-primary/20'
                  : 'border-outline-variant/40 dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-800'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container dark:bg-slate-700 text-secondary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">desktop_windows</span>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-on-surface dark:text-slate-100 block">Auto (Sistema)</span>
                <span className="text-[11px] text-on-surface-variant dark:text-slate-400">Adaptação em tempo real</span>
              </div>
            </button>
          </div>
        </section>

        {/* Google Gemini API */}
        <section className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl p-4 sm:p-6 shadow-sm border border-outline-variant/30 dark:border-slate-700 space-y-4 transition-colors">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-surface-container dark:border-slate-700">
            <span className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-primary dark:text-primary-fixed-dim flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100">
                Integração com Google Gemini API
              </h2>
              <p className="text-[11px] sm:text-xs text-on-surface-variant dark:text-slate-400">
                Conecte sua chave oficial do Google AI Studio para geração de ideias em tempo real.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="gemini-key-input" className="text-xs font-semibold text-on-surface dark:text-slate-200 block">
              Chave de API (Gemini API Key)
            </label>
            <div className="relative">
              <input
                id="gemini-key-input"
                type={apiKeyVisible ? 'text' : 'password'}
                placeholder="Ex: AIzaSyD..."
                value={settings.geminiApiKey || ''}
                onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
                className="w-full bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-slate-100 text-xs sm:text-sm px-3 py-2.5 pr-10 rounded-lg outline-none focus:bg-surface-container-lowest dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 border border-outline-variant/40 dark:border-slate-700 font-mono transition-all min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => setApiKeyVisible(!apiKeyVisible)}
                aria-label={apiKeyVisible ? 'Ocultar chave' : 'Exibir chave'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white p-1 rounded"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {apiKeyVisible ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            <p className="text-[11px] text-on-surface-variant dark:text-slate-400">
              Caso deixe em branco, o TrendPDF Studio utilizará o motor algorítmico local inteligente com centenas de padrões pré-treinados.
            </p>
          </div>
        </section>

        {/* Perfil Editorial */}
        <section className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl p-4 sm:p-6 shadow-sm border border-outline-variant/30 dark:border-slate-700 space-y-4 transition-colors">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-surface-container dark:border-slate-700">
            <span className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-primary dark:text-primary-fixed-dim flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100">
                Perfil Editorial
              </h2>
              <p className="text-[11px] sm:text-xs text-on-surface-variant dark:text-slate-400">
                Informações incluídas nas capas e relatórios gerados.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="user-name-input" className="text-xs font-semibold text-on-surface dark:text-slate-200 block">
                Nome do Autor / Editor
              </label>
              <input
                id="user-name-input"
                type="text"
                value={settings.userName || ''}
                onChange={(e) => setSettings({ ...settings, userName: e.target.value })}
                className="w-full bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-slate-100 text-xs sm:text-sm px-3 py-2.5 rounded-lg outline-none focus:bg-surface-container-lowest dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 border border-outline-variant/40 dark:border-slate-700 transition-all min-h-[44px]"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="user-plan-input" className="text-xs font-semibold text-on-surface dark:text-slate-200 block">
                Plano Atual
              </label>
              <input
                id="user-plan-input"
                type="text"
                disabled
                value={user?.plan === 'enterprise' ? 'Plano Enterprise' : 'Plano Pro'}
                className="w-full bg-surface-container dark:bg-slate-900/60 text-on-surface-variant dark:text-slate-400 text-xs sm:text-sm px-3 py-2.5 rounded-lg outline-none cursor-not-allowed opacity-80 border border-outline-variant/20 dark:border-slate-700 min-h-[44px]"
              />
            </div>
          </div>
        </section>

        {/* Preferências de Exportação */}
        <section className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl p-4 sm:p-6 shadow-sm border border-outline-variant/30 dark:border-slate-700 space-y-4 transition-colors">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-surface-container dark:border-slate-700">
            <span className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-primary dark:text-primary-fixed-dim flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100">
                Preferências de Exportação em PDF
              </h2>
              <p className="text-[11px] sm:text-xs text-on-surface-variant dark:text-slate-400">
                Defina padrões de precificação e rodapés automáticos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="currency-select" className="text-xs font-semibold text-on-surface dark:text-slate-200 block">
                Moeda Principal
              </label>
              <select
                id="currency-select"
                value={settings.currency || 'BRL'}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-slate-100 text-xs sm:text-sm px-3 py-2.5 rounded-lg outline-none focus:bg-surface-container-lowest dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 border border-outline-variant/40 dark:border-slate-700 cursor-pointer min-h-[44px]"
              >
                <option value="BRL">Real Brasileiro (R$)</option>
                <option value="USD">Dólar Americano ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="page-count-select" className="text-xs font-semibold text-on-surface dark:text-slate-200 block">
                Extensão Padrão de E-books
              </label>
              <select
                id="page-count-select"
                value={settings.defaultPageCount || '30-50'}
                onChange={(e) => setSettings({ ...settings, defaultPageCount: e.target.value })}
                className="w-full bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-slate-100 text-xs sm:text-sm px-3 py-2.5 rounded-lg outline-none focus:bg-surface-container-lowest dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 border border-outline-variant/40 dark:border-slate-700 cursor-pointer min-h-[44px]"
              >
                <option value="15-30">Micro-guia (15 a 30 páginas)</option>
                <option value="30-50">Guia Prático Padrão (30 a 50 páginas)</option>
                <option value="50-100">Manual Completo (50 a 100 páginas)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold"
          >
            Restaurar dados de demonstração
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold shadow-md shadow-primary/25 transition-all min-h-[44px] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Salvar Alterações</span>
          </button>
        </div>
      </form>

      {/* Modal de Confirmação para Reset */}
      <ModalConfirmacao
        isOpen={showResetModal}
        title="Restaurar dados de demonstração?"
        message="Isso redefinirá todas as suas ideias salvas, tendências personalizadas e configurações para o estado inicial de fábrica. Esta ação não poderá ser desfeita."
        confirmText="Sim, restaurar dados"
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetModal(false)}
        isDestructive={true}
      />
    </div>
  );
}
