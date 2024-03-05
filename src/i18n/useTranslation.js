import i18n from './index.js';

const useTranslation = {
  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(',');
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale;
  },

  async switchLanguage(newLocale) {
    useTranslation.currentLocale = newLocale;
    document.querySelector('html').setAttribute('lang', newLocale);
    localStorage.setItem('user-locale', newLocale);
  },

  // Get if preferred locale is set in local storage
  isLocaleSupported(locale) {
    return useTranslation.supportedLocales.includes(locale);
  },

  // Read the preferred language sent by the browser
  getUserLocale() {
    const locale =
      window.navigator.language ||
      window.navigator.userLanguage ||
      useTranslation.defaultLocale;
    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0],
    };
  },

  // Fallback to default locale
  getPersistedLocale() {
    const persistedLocale = localStorage.getItem('user-locale');
    if (useTranslation.isLocaleSupported(persistedLocale)) {
      return persistedLocale;
    } else {
      return null;
    }
  },

  guessDefaultLocale() {
    const userPersistedLocale = useTranslation.getPersistedLocale();
    if (userPersistedLocale) {
      return userPersistedLocale;
    }
    const userPreferredLocale = useTranslation.getUserLocale();
    if (useTranslation.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale;
    }
    if (useTranslation.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion;
    }

    return useTranslation.defaultLocale;
  },

  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE;
  },

  async routeMiddleware(to, _from, next) {
    let paramLocale = to.params.locale;
    if (!paramLocale || !useTranslation.isLocaleSupported(paramLocale)) {
      paramLocale = useTranslation.guessDefaultLocale();
      const newPath = `/${paramLocale}${to.path === '/' ? '' : to.path}`;
      return next(newPath);
    }
    await useTranslation.switchLanguage(paramLocale);
    return next();
  },

  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: useTranslation.currentLocale,
        ...to.params,
      },
    };
  },
};

export default useTranslation;
