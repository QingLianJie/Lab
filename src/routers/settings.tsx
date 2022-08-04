import { SettingsRounded } from '@mui/icons-material'
import { Card, createTheme, ThemeProvider, useTheme } from '@mui/material'
import { amber } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { SettingsDashboard } from '../components/settings/Dashboard'
import { SettingsTab } from '../components/settings/Tab'

export const SettingsPage = () => {
  const theme = useTheme()
  const { palette } = theme

  const settingsTheme = createTheme({
    ...theme,
    palette: { ...palette, primary: amber },
  })

  const [params] = useSearchParams()
  const { pathname } = useLocation()
  const [isDashboard, setDashboard] = useState(true)

  useEffect(() => {
    if (pathname !== '/settings') return
    const tab = params.get('tab')
    if (tab) setDashboard(false)
    else setDashboard(true)
  }, [params])

  return (
    <ThemeProvider theme={settingsTheme}>
      <Layout
        title="设置"
        subtitle="调整网站的各项设置"
        icon={SettingsRounded}
        color={amber[400]}
      >
        <Card
          variant="outlined"
          sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          {isDashboard ? <SettingsDashboard /> : <SettingsTab />}
        </Card>
      </Layout>
    </ThemeProvider>
  )
}
