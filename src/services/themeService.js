const THEME_STORAGE_KEY = 'trendpdf_theme_preference_v1';

export const themeService = {
  getTheme: () => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
      return 'system';
    } catch {
      return 'system';
    }
  },

  setTheme: (theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.error('Erro ao salvar tema:', e);
    }
    themeService.applyTheme(theme);
  },

  applyTheme: (theme = themeService.getTheme()) => {
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);

    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    return isDark;
  },

  initThemeListener: (callback) => {
    themeService.applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const currentTheme = themeService.getTheme();
      if (currentTheme === 'system') {
        themeService.applyTheme('system');
        if (callback) callback('system', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }
};

