import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import { darkPalette, lightPalette, typography } from './configs/custom-theme'
import { routers } from './configs/routers'

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
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Box sx={{ backgroundColor: 'background.default' }}>
            <BrowserRouter>
              <Nav />
              <Router />
            </BrowserRouter>
          </Box>
        </HelmetProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
