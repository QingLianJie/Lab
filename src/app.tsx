import { CloseOutlined } from '@mui/icons-material'
import { IconButton, Box, useMediaQuery, useTheme } from '@mui/material'
import { SnackbarProvider, closeSnackbar } from 'notistack'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Load } from './components/Load'
import { Modals } from './components/Modals'
import { Nav } from './components/Nav'
import { routers } from './configs/routers'

export default function App() {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  return (
    <BrowserRouter>
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
        <Modals />
        <Nav />
        <Router />
        <Load />
      </SnackbarProvider>
    </BrowserRouter>
  )
}

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
