import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ModalSumario from './components/ModalSumario';
import ModalPublicacao from './components/ModalPublicacao';
import ModalAuth from './components/ModalAuth';
import Toast from './components/Toast';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PesquisarTendencias from './pages/PesquisarTendencias';
import GerarIdeias from './pages/GerarIdeias';
import IdeiasSalvas from './pages/IdeiasSalvas';
import Configuracoes from './pages/Configuracoes';

import { dbService } from './services/dbService';
import { pdfService } from './services/pdfService';
import { themeService } from './services/themeService';

function MainAppContent({ theme, onThemeChange, showToast, toast, setToast, onViewLanding }) {
  const { user, deductAiCredit } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trends, setTrends] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [selectedSummaryIdea, setSelectedSummaryIdea] = useState(null);
  const [selectedPublishIdea, setSelectedPublishIdea] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prefill state for generating ideas
  const [prefilledNiche, setPrefilledNiche] = useState('');
  const [prefilledAudience, setPrefilledAudience] = useState('');

  // Sincroniza dados com o banco de dados (Supabase / Local)
  useEffect(() => {
    async function loadData() {
      const loadedTrends = await dbService.getTrends();
      setTrends(loadedTrends);

      const loadedIdeas = await dbService.getUserIdeas(user?.id);
      setIdeas(loadedIdeas);
    }

    loadData();
  }, [user?.id]);

  const handleToggleSaveIdea = async (ideaId, fallbackIdea = null) => {
    let existing = ideas.find((i) => i.id === ideaId);
    let updated;
    if (!existing && fallbackIdea) {
      updated = await dbService.saveIdea(user?.id, { ...fallbackIdea, saved: true });
    } else {
      updated = await dbService.toggleSaveIdea(user?.id, ideaId);
    }
    setIdeas(updated);

    if (selectedSummaryIdea && selectedSummaryIdea.id === ideaId) {
      setSelectedSummaryIdea((prev) => (prev ? { ...prev, saved: !prev.saved } : null));
    }
  };

  const handleDeleteIdea = async (ideaId) => {
    const updated = await dbService.deleteIdea(user?.id, ideaId);
    setIdeas(updated);
  };

  const handleSelectTrendForIdea = (keyword, audience) => {
    setPrefilledNiche(keyword);
    setPrefilledAudience(audience || '');
    setActiveTab('gerar-ideias');
    showToast({
      type: 'info',
      title: 'Nicho Carregado',
      message: `Parâmetros preenchidos com "${keyword}".`,
    });
  };

  const handleGlobalSearch = (query) => {
    setPrefilledNiche(query);
    setActiveTab('pesquisar-tendencias');
  };

  const handleQuickSearch = (query) => {
    setPrefilledNiche(query);
    setActiveTab('gerar-ideias');
    showToast({
      type: 'info',
      title: 'Pesquisa Rápida',
      message: `Configurando parâmetros para "${query}".`,
    });
  };

  const handleResetAllData = async () => {
    localStorage.clear();
    const freshTrends = await dbService.getTrends();
    const freshIdeas = await dbService.getUserIdeas(user?.id);
    setTrends(freshTrends);
    setIdeas(freshIdeas);
  };

  const handleAddNewTrend = async (newTrend) => {
    const updated = await dbService.addTrend(newTrend);
    setTrends(updated);
  };

  const savedCount = ideas.filter((i) => i.saved).length;

  return (
    <div className="min-h-screen bg-background dark:bg-[#0b0f19] text-on-surface dark:text-slate-100 antialiased font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedCount}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onViewLanding={onViewLanding}
      />

      {/* Main Content Area */}
      <div className="pl-0 lg:pl-64 transition-all duration-300">
        {/* Top Header */}
        <Header
          onGlobalSearch={handleGlobalSearch}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onNavigate={setActiveTab}
          theme={theme}
          onThemeChange={onThemeChange}
          onShowToast={showToast}
          onViewLanding={onViewLanding}
        />

        {/* Page Container with dedicated top clearance (pt-24 sm:pt-28 prevents ANY header overlap!) */}
        <main className="w-full pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-background dark:bg-[#0b0f19] transition-colors">
          <div className="max-w-[1440px] w-full mx-auto">
            {activeTab === 'dashboard' && (
              <Dashboard
                trends={trends}
                ideas={ideas}
                onNavigate={setActiveTab}
                onOpenSummary={setSelectedSummaryIdea}
                onExportPDF={pdfService.generateIdeaPDF}
                onQuickSearch={handleQuickSearch}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'pesquisar-tendencias' && (
              <PesquisarTendencias
                trends={trends}
                onSelectTrendForIdea={handleSelectTrendForIdea}
                onAddNewTrend={handleAddNewTrend}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'gerar-ideias' && (
              <GerarIdeias
                prefilledNiche={prefilledNiche}
                prefilledAudience={prefilledAudience}
                onOpenSummary={setSelectedSummaryIdea}
                onOpenPublish={setSelectedPublishIdea}
                onToggleSaveIdea={handleToggleSaveIdea}
                onNavigateToSaved={() => setActiveTab('ideias-salvas')}
                onShowToast={showToast}
                onDeductCredit={() => deductAiCredit(1)}
              />
            )}

            {activeTab === 'ideias-salvas' && (
              <IdeiasSalvas
                ideas={ideas}
                onOpenSummary={setSelectedSummaryIdea}
                onOpenPublish={setSelectedPublishIdea}
                onToggleSaveIdea={handleToggleSaveIdea}
                onDeleteIdea={handleDeleteIdea}
                onNavigateToGenerate={() => setActiveTab('gerar-ideias')}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'configuracoes' && (
              <Configuracoes
                onResetAllData={handleResetAllData}
                onShowToast={showToast}
                theme={theme}
                onThemeChange={onThemeChange}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modal Sumário & Capítulos */}
      {selectedSummaryIdea && (
        <ModalSumario
          idea={selectedSummaryIdea}
          onClose={() => setSelectedSummaryIdea(null)}
          onToggleSave={handleToggleSaveIdea}
          onShowToast={showToast}
        />
      )}

      {/* Modal de Publicação & Esteira de Lançamento */}
      {selectedPublishIdea && (
        <ModalPublicacao
          idea={selectedPublishIdea}
          isOpen={Boolean(selectedPublishIdea)}
          onClose={() => setSelectedPublishIdea(null)}
          onShowToast={showToast}
        />
      )}

      {/* Global Toast Feedback */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

function AppRoot() {
  const { user, loading, isAuthModalOpen, closeAuthModal } = useAuth();
  const [theme, setTheme] = useState(themeService.getTheme());
  const [toast, setToast] = useState(null);
  const [showLandingView, setShowLandingView] = useState(false);

  useEffect(() => {
    const cleanupListener = themeService.initThemeListener((newTheme) => {
      setTheme(newTheme);
    });
    return cleanupListener;
  }, []);

  const handleThemeChange = (newTheme) => {
    themeService.setTheme(newTheme);
    setTheme(newTheme);
    showToast({
      type: 'info',
      title: 'Tema Atualizado',
      message:
        newTheme === 'system'
          ? 'Tema definido para acompanhar o sistema operacional.'
          : `Tema alterado para modo ${newTheme === 'dark' ? 'escuro' : 'claro'}.`,
    });
  };

  const showToast = (toastData) => {
    setToast(toastData);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[#0b0f19]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-on-surface-variant dark:text-slate-400">
            Carregando TrendPDF Studio...
          </span>
        </div>
      </div>
    );
  }

  // Se o usuário NÃO estiver logado OU solicitou visualizar a Apresentação: Exibe a Landing Page
  if (!user || showLandingView) {
    return (
      <>
        <LandingPage
          theme={theme}
          onThemeChange={handleThemeChange}
          onReturnToDashboard={user ? () => setShowLandingView(false) : null}
        />
        <ModalAuth
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          onShowToast={showToast}
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  // Se o usuário ESTIVER logado: Exibe o Painel Studio Completo
  return (
    <>
      <MainAppContent
        theme={theme}
        onThemeChange={handleThemeChange}
        showToast={showToast}
        toast={toast}
        setToast={setToast}
        onViewLanding={() => setShowLandingView(true)}
      />
      <ModalAuth
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onShowToast={showToast}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoot />
    </AuthProvider>
  );
}
