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
  primary: pink,
  secondary: blue,
  background: {
    default: grey[900],
    paper: grey[800],
  },
}

export const typography = {
  fontFamily: [
    'Roboto',
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
}
