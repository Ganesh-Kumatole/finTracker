// Centralized chart colors & theme system
export type Theme = 'light' | 'dark';

// Semantic color palette
export const SEMANTIC_COLORS = {
  success: '#10b981', // Emerald
  error: '#e11d48', // Rose/Coral
  warning: '#f59e0b', // Amber
  info: '#0284c7', // Sky
  primary: '#006FEE', // Azure
  accent1: '#0ea5e9', // Blue
  accent2: '#6366f1', // Indigo muted
  accent3: '#14b8a6', // Teal
  accent4: '#8b5cf6', // Violet muted
  accent5: '#f43f5e', // Rose
};

// Multi-category chart palette
export const CHART_PALETTE = [
  SEMANTIC_COLORS.primary,
  SEMANTIC_COLORS.accent1,
  SEMANTIC_COLORS.accent2,
  SEMANTIC_COLORS.accent3,
  SEMANTIC_COLORS.accent4,
  SEMANTIC_COLORS.accent5,
  SEMANTIC_COLORS.warning,
  SEMANTIC_COLORS.error,
  SEMANTIC_COLORS.info,
];

// Theme-aware text colors
export const TEXT_COLORS = {
  light: {
    primary: '#64748b',
    muted: '#94a3b8',
  },
  dark: {
    primary: '#94a3b8',
    muted: '#64748b',
  },
};

// Theme-aware grid colors
export const GRID_COLORS = {
  light: 'rgba(100,116,139,0.10)',
  dark: 'rgba(148,163,184,0.10)',
};

export const getTextColor = (
  theme: Theme,
  type: 'primary' | 'muted' = 'primary',
): string => TEXT_COLORS[theme][type];

export const getGridColor = (theme: Theme): string => GRID_COLORS[theme];

export const getBorderColor = (theme: Theme): string =>
  theme === 'dark' ? '#1e293b' : '#ffffff';

// Convert hex to RGBA with opacity (0-100)
export const withOpacity = (hex: string, opacity: number = 10): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const alpha = opacity / 100;
  return `rgba(${r},${g},${b},${alpha})`;
};

// Pre-configured chart colors
export const LINE_CHART_COLORS = {
  income: {
    border: SEMANTIC_COLORS.success,
    background: withOpacity(SEMANTIC_COLORS.success, 10),
  },
  expense: {
    border: SEMANTIC_COLORS.error,
    background: withOpacity(SEMANTIC_COLORS.error, 8),
  },
};

export const BUDGET_CHART_COLORS = {
  budgeted: {
    background: 'rgba(0,111,238,0.15)',
    border: 'rgba(0,111,238,0.4)',
  },
  actualUnder: {
    background: 'rgba(16,185,129,0.2)',
    border: SEMANTIC_COLORS.success,
  },
  actualOver: {
    background: 'rgba(225,29,72,0.2)',
    border: SEMANTIC_COLORS.error,
  },
};

// Common chart configuration
export const CHART_CONFIG = {
  common: {
    responsive: true,
    maintainAspectRatio: false,
  },
  font: {
    small: 11,
    medium: 12,
    large: 14,
  },
  spacing: {
    boxWidth: 12,
    padding: 12,
  },
};
