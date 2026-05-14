/**
 * Formatting & Display Utilities
 */

import {
  SUCCESS, SUCCESS_BG, WARNING, WARNING_BG,
  DANGER, DANGER_BG, INFO, INFO_BG,
} from '../constants/theme';
import { AppointmentStatus } from '../types';

/** Shared status color map — single source of truth */
export const STATUS_COLORS: Record<AppointmentStatus, { bg: string; text: string }> = {
  confirmed: { bg: SUCCESS_BG, text: SUCCESS },
  pending:   { bg: WARNING_BG, text: WARNING },
  cancelled: { bg: DANGER_BG,  text: DANGER  },
  completed: { bg: INFO_BG,    text: INFO    },
};

/** Capitalize first letter */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Truncate to max length with ellipsis */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '…';
}

/** Convert camelCase key to a readable label */
export function camelToLabel(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

/** Gender display */
export function genderLabel(g: 'M' | 'F' | 'Other'): string {
  if (g === 'M') return 'Male';
  if (g === 'F') return 'Female';
  return 'Other';
}
