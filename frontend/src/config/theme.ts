/**
 * Admin-Configurable Design System Configuration
 * This configuration is consumed dynamically by ThemeContext.
 * Ready for future Laravel CMS API injection without frontend restructuring.
 */

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
  accent: string;
  accentHover: string;
  teal: string;
  lightBackground: string;
  lightSurface: string;
  darkBackground: string;
  darkSurface: string;
}

export interface TypographySettings {
  primaryFont: string;
  secondaryFont: string;
  headingFont: string;
  bodyFont: string;
  baseFontSize: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  typography: TypographySettings;
  borderRadius: string;
}

export const defaultThemeConfig: ThemeConfig = {
  colors: {
    primary: '#1A305A',
    primaryHover: '#0D1B36',
    secondary: '#11813C',
    secondaryHover: '#0B5C2B',
    accent: '#A302FF',
    accentHover: '#7A00C2',
    teal: '#00A896',
    lightBackground: '#FFFFFF',
    lightSurface: '#F8FAFC',
    darkBackground: '#0B1120',
    darkSurface: '#0F172A',
  },
  typography: {
    primaryFont: "'Poppins', sans-serif",
    secondaryFont: "'Hind Siliguri', 'Poppins', sans-serif",
    headingFont: "'Poppins', sans-serif",
    bodyFont: "'Poppins', sans-serif",
    baseFontSize: '16px',
  },
  borderRadius: '0.75rem',
};

/**
 * Applies the given ThemeConfig dynamically to the document root as CSS variables.
 */
export function applyThemeConfig(config: ThemeConfig = defaultThemeConfig): void {
  const root = document.documentElement;

  // Apply colors
  root.style.setProperty('--color-primary', config.colors.primary);
  root.style.setProperty('--color-primary-hover', config.colors.primaryHover);
  root.style.setProperty('--color-secondary', config.colors.secondary);
  root.style.setProperty('--color-secondary-hover', config.colors.secondaryHover);
  root.style.setProperty('--color-accent', config.colors.accent);
  root.style.setProperty('--color-accent-hover', config.colors.accentHover);
  root.style.setProperty('--color-teal', config.colors.teal);

  // Apply typography
  root.style.setProperty('--font-primary', config.typography.primaryFont);
  root.style.setProperty('--font-secondary', config.typography.secondaryFont);
}

