import { CloseOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  CircularProgress,
  createTheme,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { closeSnackbar, SnackbarProvider } from 'notistack'
import { StrictMode, Suspense, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogoOutlined from './assets/logo-outlined.svg'
import { Load } from './components/Load'
import { Modals } from './components/Modals'
import { Nav } from './components/Nav'
import {
  components,
  darkPalette,
  lightPalette,
  typography,
} from './configs/custom-theme'
import { routers } from './configs/routers'
import { info } from './configs/site-info'

const Router = () => (
  <Routes>
    {routers.map(router => (
      <Route
        path={router.href}
        element={<Box component={router.component} />}
        key={router.name}
      >
        {router.children?.map(r => (
          <Route
            path={r.href}
            element={<Box component={r.component} />}
            key={r.name}
          />
        ))}
      </Route>
    ))}
  </Routes>
)

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
      sx={{ width: 96, height: 96, m: 2 }}
    />
    <Typography
      variant="h6"
      component="p"
      sx={{ fontWeight: 700, userSelect: 'none' }}
    >
      正在进入{info.name}
    </Typography>
    <CircularProgress size={24} thickness={6} />
  </Stack>
)

const App = () => {
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

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Suspense fallback={<Loading />}>
            <Box sx={{ backgroundColor: 'background.default' }}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: isMobile ? 'top' : 'bottom',
                  horizontal: 'center',
                }}
                autoHideDuration={3000}
                style={{ fontSize: '1rem', paddingLeft: '1.25rem' }}
                hideIconVariant
                action={snackbarKey => (
                  <IconButton
                    aria-label="关闭"
                    sx={{ color: 'inherit', fontSize: '0.925rem' }}
                    onClick={() => closeSnackbar(snackbarKey)}
                  >
                    <CloseOutlined />
                  </IconButton>
                )}
              >
                <BrowserRouter>
                  <Modals />
                  <Nav />
                  <Router />
                  <Load />
                </BrowserRouter>
              </SnackbarProvider>
            </Box>
          </Suspense>
        </HelmetProvider>
      </ThemeProvider>
    </StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
