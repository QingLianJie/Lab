import {
  Avatar,
  Box,
  CircularProgress,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { lazy, StrictMode, Suspense, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import LogoOutlined from './assets/logo-outlined.svg'
import {
  components,
  darkPalette,
  lightPalette,
  typography,
} from './configs/custom-theme'
import { info } from './configs/site-info'

const LazyApp = lazy(() => import('./app'))

const Main = () => {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () =>
      createTheme({
        palette: darkMode ? darkPalette : lightPalette,
        typography,
        components,
      }),
    [darkMode]
  )

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Suspense fallback={<Loading />}>
            <Box sx={{ backgroundColor: 'background.default' }}>
              <LazyApp />
            </Box>
          </Suspense>
        </HelmetProvider>
      </ThemeProvider>
    </StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />)

const Loading = () => (
  <Stack
    spacing={2}
    sx={{
      position: 'fixed',
      zIndex: 2000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      right: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'background.default',
    }}
  >
    <Avatar
      variant="square"
      alt="网站 Logo"
      src={LogoOutlined}
      sx={{ width: 96, height: 96, mt: { sx: 0, sm: 6 }, mb: 4 }}
    />
    <Typography variant="h6" component="p" sx={{ userSelect: 'none' }}>
      正在进入{' '}
      <Typography
        variant="h6"
        component="span"
        sx={{ fontWeight: 700, userSelect: 'none' }}
      >
        {info.name}
      </Typography>
    </Typography>
    <CircularProgress size={24} thickness={6} />
  </Stack>
)
