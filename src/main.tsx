import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import { StrictMode, Suspense, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import { darkPalette, lightPalette, typography } from './configs/custom-theme'
import { routers } from './configs/routers'
import { NotFoundPage } from './routers/404'

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
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

const Loading = () => {
  return <Box sx={{ backgroundColor: 'background.default' }}>加载中</Box>
}

const App = () => {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () =>
      createTheme({
        palette: darkMode ? darkPalette : lightPalette,
        typography,
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
              <BrowserRouter>
                <Nav />
                <Router />
              </BrowserRouter>
            </Box>
          </Suspense>
        </HelmetProvider>
      </ThemeProvider>
    </StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
