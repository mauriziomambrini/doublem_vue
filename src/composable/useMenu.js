import * as ICONS from '@icons';
import { useI18n } from 'vue-i18n';

const MenuContext = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  PAGE: 'page',
  UTILS_DESKTOP: 'utils_desktop',
  UTILS_PAGE: 'utils_page',
  SOCIAL: 'social',
};

const useMenu = (context) => {
  const { t } = useI18n();

  const entries = {
    home: {
      key: 'home',
      icon: ICONS.home,
      label: t('menu.label.home'),
      href: '/',
      shortcut: ['H'],
    },
    about: {
      key: 'about',
      icon: ICONS.about,
      label: t('menu.label.about'),
      href: '/about',
      shortcut: ['A'],
    },
    what: {
      key: 'what',
      icon: ICONS.what,
      label: t('menu.label.what'),
      href: '/what',
      shortcut: ['W'],
    },
    skills: {
      key: 'skills',
      icon: ICONS.skills,
      label: t('menu.label.skills'),
      href: '/skills',
      shortcut: ['S'],
    },
    education: {
      key: 'education',
      icon: ICONS.education,
      label: t('menu.label.education'),
      href: '/education',
      shortcut: ['K'],
    },
    experience: {
      key: 'experience',
      icon: ICONS.experience,
      label: t('menu.label.experience'),
      href: '/experience',
      shortcut: ['E'],
    },
    privacy: {
      key: 'privacy',
      icon: ICONS.privacy,
      label: t('menu.label.privacy'),
      href: '/privacy',
      shortcut: ['P'],
    },
    menu: {
      key: 'menu',
      icon: ICONS.menu,
      label: t('menu.label.menu'),
      href: '/menu',
      shortcut: ['ctrl', 'M'],
    },
    cv: {
      key: 'cv',
      icon: ICONS.download,
      label: t('menu.label.cv_download'),
      href: '/cv',
      target: '_blank',
    },
    contacts: {
      key: 'contacts',
      icon: ICONS.mail,
      label: t('menu.label.contacts'),
      href: '/contacts',
    },
    linkedin: {
      key: 'linkedin',
      icon: ICONS.linkedin,
      label: t('label.linkedin'),
      href: 'https://www.linkedin.com/in/mauriziomambrini/',
    },
    github: {
      key: 'github',
      icon: ICONS.github,
      label: t('label.github'),
      href: 'https://github.com/mauriziomambrini',
    },
    telegram: {
      key: 'telegram',
      icon: ICONS.telegram,
      label: t('label.telegram'),
      href: 'https://t.me/mauriziomambrini',
    },
  };

  const mobile = [
    entries.home,
    entries.what,
    entries.skills,
    entries.experience,
    entries.menu,
  ];

  const desktop = [
    entries.home,
    entries.what,
    entries.about,
    entries.skills,
    entries.experience,
    entries.education,
  ];

  const page = [
    entries.home,
    entries.what,
    entries.about,
    entries.skills,
    entries.experience,
    entries.education,
  ];

  const utilsDesktop = [entries.contacts, entries.menu];

  const utilsPage = [entries.contacts, entries.privacy, entries.cv];

  const social = [entries.linkedin, entries.github, entries.telegram];

  switch (context) {
    case MenuContext.MOBILE:
      return mobile;
    case MenuContext.PAGE:
      return page;
    case MenuContext.UTILS_DESKTOP:
      return utilsDesktop;
    case MenuContext.UTILS_PAGE:
      return utilsPage;
    case MenuContext.SOCIAL:
      return social;
    default:
      return desktop;
  }
};

export { MenuContext, useMenu };
