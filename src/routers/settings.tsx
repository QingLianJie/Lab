import { SettingsRounded } from '@mui/icons-material'
import { Card, createTheme, ThemeProvider, useTheme } from '@mui/material'
import { amber, pink } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { SettingsDashboard } from '../components/settings/Dashboard'
import { SettingsTab } from '../components/settings/Tab'

export const SettingsPage = () => {
  const theme = useTheme()
  const { palette } = theme
  const isDark = palette.mode === 'dark'

  const settingsTheme = createTheme({
    ...theme,
    palette: {
      ...palette,
      primary: amber,
      secondary: isDark ? { main: '#ec407a' } : pink,
    },
  })

  const [params] = useSearchParams()
  const { pathname } = useLocation()
  const [dashboard, setDashboard] = useState<null | 'dashboard' | 'tab'>(null)

  useEffect(() => {
    if (pathname !== '/settings') {
      setDashboard(null)
      return
    }
    const tab = params.get('tab')
    if (tab) setDashboard('tab')
    else setDashboard('dashboard')
  }, [params])

  return (
    <ThemeProvider theme={settingsTheme}>
      <Layout
        title="设置"
        subtitle="调整网站的各项设置"
        icon={SettingsRounded}
        color={amber[400]}
      >
        {dashboard ? (
          dashboard === 'dashboard' ? (
            <Card
              variant="outlined"
              sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <SettingsDashboard />
            </Card>
          ) : (
            <SettingsTab />
          )
        ) : null}
      </Layout>
    </ThemeProvider>
  )
}
