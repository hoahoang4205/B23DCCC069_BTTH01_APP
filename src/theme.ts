export interface ThemeColors {
  primary: string;
  primarySoft: string;
  primaryDark: string;
  accent: string;
  bg: string;
  card: string;
  cardSecondary: string;
  cardHighlight: string;
  text: string;
  textSecondary: string;
  muted: string;
  border: string;
  borderLight: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;
  info: string;
  infoSoft: string;
  shadowColor: string;
  inputBg: string;
  tabBarBg: string;
}

export const LIGHT_COLORS: ThemeColors = {
  primary: '#4F46E5',        // Indigo
  primarySoft: '#EEF2FF',    // Soft indigo 50
  primaryDark: '#3730A3',
  accent: '#6366F1',
  bg: '#F8FAFC',             // Slate 50
  card: '#FFFFFF',
  cardSecondary: '#F1F5F9',  // Slate 100
  cardHighlight: '#E0E7FF',
  text: '#0F172A',           // Slate 900
  textSecondary: '#334155',  // Slate 700
  muted: '#64748B',          // Slate 500
  border: '#E2E8F0',         // Slate 200
  borderLight: '#F1F5F9',
  success: '#10B981',        // Emerald 500
  successSoft: '#D1FAE5',    // Emerald 100
  danger: '#EF4444',         // Red 500
  dangerSoft: '#FEE2E2',     // Red 100
  warning: '#F59E0B',        // Amber 500
  warningSoft: '#FEF3C7',    // Amber 100
  info: '#3B82F6',           // Blue 500
  infoSoft: '#DBEAFE',       // Blue 100
  shadowColor: '#0F172A',
  inputBg: '#FFFFFF',
  tabBarBg: '#FFFFFF',
};

export const DARK_COLORS: ThemeColors = {
  primary: '#818CF8',        // Indigo 400
  primarySoft: '#1E1B4B',    // Indigo 950
  primaryDark: '#A5B4FC',
  accent: '#6366F1',
  bg: '#0F172A',             // Slate 900
  card: '#1E293B',           // Slate 800
  cardSecondary: '#334155',  // Slate 700
  cardHighlight: '#2E3856',
  text: '#F8FAFC',           // Slate 50
  textSecondary: '#E2E8F0',  // Slate 200
  muted: '#94A3B8',          // Slate 400
  border: '#334155',         // Slate 700
  borderLight: '#1E293B',
  success: '#34D399',        // Emerald 400
  successSoft: '#064E3B',    // Emerald 900
  danger: '#F87171',         // Red 400
  dangerSoft: '#7F1D1D',     // Red 900
  warning: '#FBBF24',        // Amber 400
  warningSoft: '#78350F',    // Amber 900
  info: '#60A5FA',           // Blue 400
  infoSoft: '#1E3A8A',       // Blue 900
  shadowColor: '#000000',
  inputBg: '#1E293B',
  tabBarBg: '#1E293B',
};

// Default export for backwards compatibility
export const COLORS = LIGHT_COLORS;

export const SHADOW = {
  shadowColor: '#0F172A',
  shadowOpacity: 0.06,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
};

export const SHADOW_SM = {
  shadowColor: '#0F172A',
  shadowOpacity: 0.04,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};
