// Layout
export const LayoutTheme = (value) => ['default', 'simple'].includes(value);
export const HeroTheme = (value) => ['default', 'simple'].includes(value);

// Nav
export const ItemNavTheme = (value) =>
  ['mobile', 'desktop', 'page'].includes(value);

// Typography
export const TypoFamily = (value) => ['sans', 'mono'].includes(value);
export const TypoTags = (value) =>
  ['h1', 'h2', 'h3', 'h4', 'p', 'label', 'span'].includes(value);
export const TypoSize = (value) =>
  [
    'xbig',
    'big',
    'db',
    'xxl',
    'xl',
    'lg',
    'df',
    'md',
    'sm',
    'xs',
    'xxs',
  ].includes(value);
export const TypoWeight = (value) =>
  ['regular', 'medium', 'semi-bold', 'bold'].includes(value);
export const TypoLineHeight = (value) =>
  ['default', 'paragraph'].includes(value);

// Divider
export const DividerTheme = (value) =>
  ['lineH', 'lineV', 'spaceH', 'spaceV'].includes(value);

// Tabs
export const TabsDirection = (value) => ['row', 'column'].includes(value);
export const TabsTheme = (value) => ['switch'].includes(value);

// Skill
export const SkillClasses = (value) =>
  ['wrapper', 'icon', 'label'].includes(value);

// Date badge
export const DateBadgeTheme = (value) => ['month', 'year'].includes(value);
