import { INITIAL_IDEAS, INITIAL_TRENDS } from '../data/mockData';
import { trendIntelligenceService } from './trendIntelligenceService';

const STORAGE_KEYS = {
  IDEAS: 'trendpdf_ideas_v1',
  TRENDS: 'trendpdf_trends_v2', // v2 com metadados de auditoria e proveniência
  SETTINGS: 'trendpdf_settings_v1',
};

export const storageService = {
  getIdeas: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.IDEAS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(INITIAL_IDEAS));
        return INITIAL_IDEAS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_IDEAS;
    }
  },

  saveIdeas: (ideas) => {
    try {
      localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(ideas));
    } catch (e) {
      console.error('Erro ao salvar ideias:', e);
    }
  },

  toggleSaveIdea: (ideaId) => {
    const ideas = storageService.getIdeas();
    const updated = ideas.map((idea) => {
      if (idea.id === ideaId) {
        return { ...idea, saved: !idea.saved };
      }
      return idea;
    });
    storageService.saveIdeas(updated);
    return updated;
  },

  addIdea: (newIdea) => {
    const ideas = storageService.getIdeas();
    const updated = [newIdea, ...ideas];
    storageService.saveIdeas(updated);
    return updated;
  },

  deleteIdea: (ideaId) => {
    const ideas = storageService.getIdeas();
    const updated = ideas.filter((i) => i.id !== ideaId);
    storageService.saveIdeas(updated);
    return updated;
  },

  getTrends: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRENDS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.TRENDS, JSON.stringify(INITIAL_TRENDS));
        return INITIAL_TRENDS;
      }
      const parsed = JSON.parse(data);
      // Garante enriquecimento de proveniência em dados antigos
      const enriched = parsed.map((t) => trendIntelligenceService.enrichExistingTrend(t));
      return enriched;
    } catch {
      return INITIAL_TRENDS;
    }
  },

  saveTrends: (trends) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRENDS, JSON.stringify(trends));
    } catch (e) {
      console.error('Erro ao salvar tendências:', e);
    }
  },

  addTrend: (newTrend) => {
    const trends = storageService.getTrends();
    // Previne duplicatas de mesma palavra-chave
    const filtered = trends.filter((t) => t.keyword.toLowerCase() !== newTrend.keyword.toLowerCase());
    const updated = [newTrend, ...filtered];
    storageService.saveTrends(updated);
    return updated;
  },

  getSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        const defaultSettings = {
          userName: 'Ana Martins',
          userPlan: 'Plano Pro',
          geminiApiKey: '',
          currency: 'BRL',
          exportFooterNotice: true,
          defaultPageCount: '30-50',
        };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
        return defaultSettings;
      }
      return JSON.parse(data);
    } catch {
      return {
        userName: 'Ana Martins',
        userPlan: 'Plano Pro',
        geminiApiKey: '',
        currency: 'BRL',
        exportFooterNotice: true,
        defaultPageCount: '30-50',
      };
    }
  },

  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Erro ao salvar configurações:', e);
    }
  }
};
