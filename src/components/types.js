// Layout
export const HeroTheme = (value) => ['default', 'simple'].includes(value);

// Nav
export const ItemNavTheme = (value) =>
  ['mobile', 'desktop', 'page'].includes(value);
export const ItemNavClasses = (value) =>
  ['wrapper', 'icon', 'label'].includes(value);

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

// Button
export const ButtonClasses = (value) =>
  ['wrapper', 'icon', 'content', 'label'].includes(value);
export const ButtonTheme = (value) =>
  ['fill', 'outline', 'text'].includes(value);
export const ButtonSize = (value) => ['sm', 'df', 'lg'].includes(value);
export const ButtonIconPosition = (value) =>
  ['before', 'after'].includes(value);

// Divider
export const DividerTheme = (value) =>
  ['lineH', 'lineV', 'spaceH', 'spaceV'].includes(value);

// Tabs
export const TabsDirection = (value) => ['row', 'column'].includes(value);
export const TabsTheme = (value) => ['switch'].includes(value);

// Skill
export const SkillClasses = (value) =>
  ['wrapper', 'icon', 'label'].includes(value);

// Label badge
export const LabelBadgeTheme = (value) => ['default', 'tag'].includes(value);

// Date badge
export const DateBadgeTheme = (value) => ['month', 'year'].includes(value);
