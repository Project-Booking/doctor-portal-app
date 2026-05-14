/**
 * Doctor Portal App — Design System & Theme
 * Unified color palette, spacing, and typography tokens.
 */

import { Platform } from 'react-native';

// ── Primary Palette ──────────────────────────────────────────────────────────
export const PRIMARY = '#7C3AED';       // Violet 600
export const PRIMARY_LIGHT = '#A78BFA'; // Violet 400
export const PRIMARY_DARK = '#5B21B6';  // Violet 700
export const PRIMARY_BG = '#F3F0FF';    // Violet 50
export const PRIMARY_SUBTLE = '#EDE9FE'; // Violet 100

// ── Semantic ─────────────────────────────────────────────────────────────────
export const SUCCESS = '#10B981';
export const SUCCESS_BG = '#D1FAE5';
export const WARNING = '#F59E0B';
export const WARNING_BG = '#FEF3C7';
export const DANGER = '#EF4444';
export const DANGER_BG = '#FEE2E2';
export const INFO = '#3B82F6';
export const INFO_BG = '#DBEAFE';

// ── Neutrals ─────────────────────────────────────────────────────────────────
export const WHITE = '#FFFFFF';
export const GRAY_50 = '#F9FAFB';
export const GRAY_100 = '#F3F4F6';
export const GRAY_200 = '#E5E7EB';
export const GRAY_300 = '#D1D5DB';
export const GRAY_400 = '#9CA3AF';
export const GRAY_500 = '#6B7280';
export const GRAY_600 = '#4B5563';
export const GRAY_700 = '#374151';
export const GRAY_800 = '#1F2937';
export const GRAY_900 = '#111827';

// ── Typography Scale ──────────────────────────────────────────────────────────
export const FONT_XS = 11;
export const FONT_SM = 13;
export const FONT_MD = 15;
export const FONT_BASE = 16;
export const FONT_LG = 18;
export const FONT_XL = 20;
export const FONT_2XL = 24;
export const FONT_3XL = 28;
export const FONT_4XL = 32;

// ── Spacing ───────────────────────────────────────────────────────────────────
export const SPACE_XS = 4;
export const SPACE_SM = 8;
export const SPACE_MD = 12;
export const SPACE_LG = 16;
export const SPACE_XL = 20;
export const SPACE_2XL = 24;
export const SPACE_3XL = 32;

// ── Border Radius ─────────────────────────────────────────────────────────────
export const RADIUS_SM = 8;
export const RADIUS_MD = 12;
export const RADIUS_LG = 16;
export const RADIUS_XL = 20;
export const RADIUS_FULL = 999;

// ── Shadows ───────────────────────────────────────────────────────────────────
export const SHADOW_SM = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 4,
  elevation: 2,
};

export const SHADOW_MD = {
  shadowColor: '#7C3AED',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 4,
};

// ── Nav Colors (for Expo Router Tabs) ────────────────────────────────────────
export const Colors = {
  light: {
    text: GRAY_900,
    background: PRIMARY_BG,
    tint: PRIMARY,
    icon: GRAY_400,
    tabIconDefault: GRAY_400,
    tabIconSelected: PRIMARY,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: PRIMARY_LIGHT,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: PRIMARY_LIGHT,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "Inter, system-ui, -apple-system, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, monospace",
  },
});
