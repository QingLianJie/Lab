import { blue, grey, pink } from '@mui/material/colors'

export const lightPalette = {
  mode: 'light' as const,
  primary: pink,
  secondary: blue,
  background: {
    default: grey[50],
    paper: 'white',
  },
}

export const darkPalette = {
  mode: 'dark' as const,
  primary: {
    main: '#f06292',
  },
  secondary: blue,
  background: {
    default: grey[900],
    paper: grey[800],
  },
}

export const typography = {
  fontFamily: [
    'Inter',
    'HarmonyOS Sans SC',
    'MiSans',
    'Source Han Sans SC',
    'Noto Sans SC',
    'Source Han Sans',
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
        padding: '6px 12px',
        textTransform: 'none' as const,
      },
    },
    defaultProps: {
      disableElevation: true,
      variant: 'text' as const,
      color: 'info' as const,
    },
  },
}
