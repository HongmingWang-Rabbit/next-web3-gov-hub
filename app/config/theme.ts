/**
 * Theme Configuration
 *
 * All color scheme and styling settings
 * Based on the OUI color scheme template
 */

export const themeConfig = {
  // Font family
  fonts: {
    base: 'Manrope, sans-serif',
    heading: 'Manrope, sans-serif',
    mono: 'monospace',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',
  },

  // Base font size
  fontSize: {
    base: '16px',
  },

  // Color palette (RGB values without 'rgb()' wrapper)
  colors: {
    // Primary colors
    primary: '251 154 27',
    primaryLight: '252 186 92',
    primaryDarken: '200 123 22',
    primaryContrast: '255 255 255',

    // Link colors
    link: '251 154 27',
    linkLight: '252 186 92',

    // Secondary colors
    secondary: '255 255 255',
    tertiary: '47 31 14',
    quaternary: '47 31 14',

    // Status colors
    danger: '245 97 139',
    dangerLight: '250 167 188',
    dangerDarken: '237 72 122',
    dangerContrast: '255 255 255',

    success: '41 233 169',
    successLight: '101 240 194',
    successDarken: '0 161 120',
    successContrast: '255 255 255',

    warning: '251 154 27',
    warningLight: '252 186 92',
    warningDarken: '200 123 22',
    warningContrast: '255 255 255',

    // Base colors (backgrounds)
    fill: '12 8 4',
    fillActive: '20 13 6',

    base1: '47 31 14',
    base2: '42 28 12',
    base3: '37 25 11',
    base4: '32 21 9',
    base5: '27 18 8',
    base6: '22 15 6',
    base7: '20 13 6',
    base8: '16 11 5',
    base9: '12 8 4',
    base10: '8 5 3',
    baseForeground: '255 255 255',

    // Line/border color
    line: '47 31 14',

    // Trading colors
    tradingLoss: '245 97 139',
    tradingLossContrast: '255 255 255',
    tradingProfit: '41 233 169',
    tradingProfitContrast: '255 255 255',
  },

  // Gradients
  gradients: {
    primary: {
      start: '20 13 6',
      end: '251 154 27',
    },
    secondary: {
      start: '47 31 14',
      end: '251 154 27',
    },
    success: {
      start: '1 83 68',
      end: '41 223 169',
    },
    danger: {
      start: '153 24 76',
      end: '245 97 139',
    },
    brand: {
      start: '252 186 92',
      end: '200 123 22',
      stopStart: '6.62%',
      stopEnd: '86.5%',
      angle: '17.44deg',
    },
    warning: {
      start: '47 31 14',
      end: '251 154 27',
    },
    neutral: {
      start: '12 8 4',
      end: '20 13 6',
    },
  },

  // Border radius
  radius: {
    sm: '2px',
    default: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
  },

  // Spacing (optional, can be used for consistent spacing)
  spacing: {
    xs: '20rem',
    sm: '22.5rem',
    md: '26.25rem',
    lg: '30rem',
    xl: '33.75rem',
  },
} as const;

export type ThemeConfig = typeof themeConfig;

// Helper function to generate CSS variables from theme config
export function generateCSSVariables(): string {
  const { colors, fonts, fontSize, radius, gradients } = themeConfig;

  return `
    /* Fonts */
    --font-family: '${fonts.base}';
    --font-size-base: ${fontSize.base};

    /* Colors */
    --color-primary: ${colors.primary};
    --color-primary-light: ${colors.primaryLight};
    --color-primary-darken: ${colors.primaryDarken};
    --color-primary-contrast: ${colors.primaryContrast};

    --color-secondary: ${colors.secondary};
    --color-tertiary: ${colors.tertiary};

    --color-danger: ${colors.danger};
    --color-danger-light: ${colors.dangerLight};
    --color-success: ${colors.success};
    --color-success-light: ${colors.successLight};

    --color-base-1: ${colors.base1};
    --color-base-2: ${colors.base2};
    --color-base-3: ${colors.base3};
    --color-base-6: ${colors.base6};
    --color-base-7: ${colors.base7};
    --color-base-8: ${colors.base8};
    --color-base-9: ${colors.base9};
    --color-base-foreground: ${colors.baseForeground};

    /* Shadcn theme colors */
    --background: ${colors.base9};
    --foreground: ${colors.baseForeground};
    --card: ${colors.base7};
    --card-foreground: ${colors.baseForeground};
    --popover: ${colors.base7};
    --popover-foreground: ${colors.baseForeground};
    --primary: ${colors.primary};
    --primary-foreground: ${colors.primaryContrast};
    --secondary: ${colors.base1};
    --secondary-foreground: ${colors.baseForeground};
    --muted: ${colors.base3};
    --muted-foreground: ${colors.baseForeground};
    --accent: ${colors.primary};
    --accent-foreground: ${colors.primaryContrast};
    --destructive: ${colors.danger};
    --destructive-foreground: ${colors.dangerContrast};
    --border: ${colors.base1};
    --input: ${colors.base1};
    --ring: ${colors.primary};
    --radius: ${radius.default};
  `;
}
