// Typography Constants
export const typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    bold: 'System',
    semibold: 'System',
    light: 'System',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 13,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
  },

  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },

  // Text Styles
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 1.2,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 1.3,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 1.3,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 1.4,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 1.4,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.5,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 1.5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 1.4,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 1.4,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 1.4,
  },
};

// Export helper function
export const getTextStyle = (style) => {
  return typography[style] || typography.body;
};
