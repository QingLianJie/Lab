import { blue, grey, pink } from '@mui/material/colors'

export const lightPalette = {
  mode: 'light' as const,
  primary: pink,
  secondary: blue,
  background: { default: grey[50], paper: 'white', subtle: grey[50] },
}

export const darkPalette = {
  mode: 'dark' as const,
  primary: { main: '#ec407a' },
  secondary: blue,
  background: { default: grey[900], paper: grey[800], subtle: '#4a4a4a' },
}

export const typography = {
  fontFamily: [
    'Inter',
    'HarmonyOS Sans SC',
    'MiSans',
    'OPPOSans',
    'Source Han Sans SC',
    'Source Han Sans',
    'system-ui',
    'Noto Sans SC',
    'Noto Sans',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Noto Color Emoji',
  ].join(','),
  fontWeightRegular: 500,
  code: {
    fontSize: '1rem',
    fontWeightRegular: 400,
    fontFamily: [
      'Cascadia Code',
      'JetBrains Mono',
      'Fira Mono',
      'Source Code Pro',
      'Consolas',
      'Courier New',
      'monospace',
    ].join(','),
  },
}

export const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        minWidth: 'unset',
        padding: '4px 12px',
        textTransform: 'none' as const,
      },
    },
    defaultProps: {
      disableElevation: true,
      variant: 'text' as const,
      color: 'info' as const,
    },
  },
  MuiButtonBase: {
    styleOverrides: { root: { font: 'inherit' } },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: 'none',
        textUnderlineOffset: '0.2em',
        '&:hover': { textDecoration: 'underline' },
      },
    },
  },
}
