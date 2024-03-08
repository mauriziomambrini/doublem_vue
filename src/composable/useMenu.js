import { computed } from 'vue';
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

  const entries = computed(() => ({
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
  }));

  const mobile = computed(() => [
    entries.value.home,
    entries.value.what,
    entries.value.skills,
    entries.value.experience,
    entries.value.menu,
  ]);

  const desktop = computed(() => [
    entries.value.home,
    entries.value.what,
    entries.value.about,
    entries.value.skills,
    entries.value.experience,
    entries.value.education,
  ]);

  const page = computed(() => [
    entries.value.home,
    entries.value.what,
    entries.value.about,
    entries.value.skills,
    entries.value.experience,
    entries.value.education,
  ]);

  const utilsDesktop = computed(() => [
    entries.value.contacts,
    entries.value.menu,
  ]);

  const utilsPage = computed(() => [
    entries.value.contacts,
    entries.value.privacy,
    entries.value.cv,
  ]);

  const social = computed(() => [
    entries.value.linkedin,
    entries.value.github,
    entries.value.telegram,
  ]);

  const menu = computed(() => {
    switch (context) {
      case MenuContext.MOBILE:
        return mobile.value;
      case MenuContext.PAGE:
        return page.value;
      case MenuContext.UTILS_DESKTOP:
        return utilsDesktop.value;
      case MenuContext.UTILS_PAGE:
        return utilsPage.value;
      case MenuContext.SOCIAL:
        return social.value;
      default:
        return desktop.value;
    }
  });

  return menu;
};

export { MenuContext, useMenu };
