import * as ICONS from '@icons';

const MenuContext = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  PAGE: 'page',
  UTILS_DESKTOP: 'utils_desktop',
  UTILS_PAGE: 'utils_page',
  SOCIAL: 'social',
};

const useMenu = (context) => {
  const entries = {
    home: {
      key: 'home',
      icon: ICONS.home,
      label: 'menu.label.home',
      href: '/',
    },
    about: {
      key: 'about',
      icon: ICONS.about,
      label: 'menu.label.about',
      href: '/about',
    },
    what: {
      key: 'what',
      icon: ICONS.what,
      label: 'menu.label.what',
      href: '/what',
    },
    why: {
      key: 'why',
      icon: ICONS.what,
      label: 'menu.label.why',
      href: '/why',
    },
    skills: {
      key: 'skills',
      icon: ICONS.skills,
      label: 'menu.label.skills',
      href: '/skills',
    },
    education: {
      key: 'education',
      icon: ICONS.education,
      label: 'menu.label.education',
      href: '/education',
    },
    experience: {
      key: 'experience',
      icon: ICONS.experience,
      label: 'menu.label.experience',
      href: '/experience',
    },
    privacy: {
      key: 'privacy',
      icon: ICONS.privacy,
      label: 'menu.label.privacy',
      href: '/privacy',
    },
    menu: {
      key: 'menu',
      icon: ICONS.menu,
      label: 'menu.label.menu',
      href: '/menu',
    },
    cv: {
      key: 'cv',
      icon: ICONS.download,
      label: 'menu.label.cv_download',
      href: '/cv_maurizio_mambrini.pdf',
      target: '_blank',
    },
    contacts: {
      key: 'contacts',
      icon: ICONS.mail,
      label: 'menu.label.contacts',
      href: '/contacts',
    },
    linkedin: {
      key: 'linkedin',
      icon: ICONS.linkedin,
      label: 'label.linkedin',
      href: 'https://www.linkedin.com/in/mauriziomambrini/',
    },
    github: {
      key: 'github',
      icon: ICONS.github,
      label: 'label.github',
      href: 'https://github.com/mauriziomambrini',
    },
    telegram: {
      key: 'telegram',
      icon: ICONS.telegram,
      label: 'label.telegram',
      href: 'https://t.me/mauriziomambrini',
    },
  };

  const mobile = [
    entries.home,
    entries.why,
    entries.what,
    entries.experience,
    entries.menu,
  ];

  const desktop = [
    entries.home,
    entries.why,
    entries.what,
    entries.experience,
    entries.skills,
  ];

  const page = [
    entries.home,
    entries.why,
    entries.what,
    entries.experience,
    entries.skills,
    entries.education,
    entries.about,
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
