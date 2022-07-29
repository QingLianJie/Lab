import { SettingsRounded } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Card,
  createTheme,
  Icon,
  Stack,
  Tab,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { amber } from '@mui/material/colors'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { settingsTabs } from '../configs/settings/tabs'

export const SettingsPage = () => {
  const theme = useTheme()
  const { breakpoints, palette } = theme
  const settingsTheme = createTheme({
    ...theme,
    palette: { ...palette, primary: amber },
  })

  const isMobile = useMediaQuery(breakpoints.down('md'))
  const isDark = palette.mode === 'dark'

  const [params, setParams] = useSearchParams()
  const { pathname } = useLocation()
  const [currentTab, setTab] = useState(params.get('tab') || 'account')

  useEffect(() => {
    if (pathname === '/settings') {
      const tab = params.get('tab') || 'account'
      setTab(tab)
    }
  }, [params])

  const handleChange = (_event: SyntheticEvent, value: string) =>
    setParams({ tab: value })

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
          <Stack
            direction="row"
            sx={{
              width: '100%',
              height: '100%',
              flex: 1,
              alignItems: 'stretch',
            }}
          >
            <TabContext value={currentTab}>
              <Box
                sx={{
                  width: { xs: 72, md: '25%' },
                  minWidth: { xs: 48, md: 180 },
                  height: 'auto',
                  display: 'flex',
                  borderRightWidth: 1,
                  borderRightStyle: 'solid',
                  borderColor: 'divider',
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  orientation="vertical"
                  sx={{
                    py: 1,
                    width: '100%',
                    height: '100%',
                    '& .MuiTabs-scrollButtons.Mui-disabled': { opacity: 0.3 },
                    '& .MuiTabs-indicator': {
                      left: 0,
                      right: 'unset',
                      backgroundColor: amber[isDark ? 500 : 600],
                    },
                  }}
                >
                  {settingsTabs.map(tab => (
                    <Tab
                      aria-label={tab.name}
                      label={
                        <Typography
                          sx={{
                            pl: { xs: 0, md: 1 },
                            display: { xs: 'none', md: 'flex' },
                          }}
                        >
                          {tab.name}
                        </Typography>
                      }
                      value={tab.id}
                      icon={
                        <Icon
                          component={tab.icon[tab.id === currentTab ? 1 : 0]}
                          sx={{
                            ml: { xs: 1, md: 0.5 },
                            fontSize: '1.375rem',
                            color: 'text.disabled',
                          }}
                        />
                      }
                      iconPosition="start"
                      key={tab.name}
                      sx={{
                        minHeight: 48,
                        minWidth: 48,
                        px: { xs: 1, md: 2 },
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        fontSize: 'body1.fontSize',
                        transition: 'background-color 0.2s',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        '&:hover': {
                          backgroundColor: isMobile ? 'unset' : 'action.hover',
                        },
                        '&.Mui-selected svg': {
                          color: amber[isDark ? 500 : 600],
                        },
                        '&.Mui-selected p': {
                          color: 'text.primary',
                          fontWeight: 700,
                        },
                      }}
                    />
                  ))}
                </TabList>
              </Box>
              {settingsTabs.map(tab => (
                <TabPanel
                  value={tab.id}
                  key={tab.name}
                  sx={{ p: 0, width: '100%', overflow: 'hidden' }}
                >
                  <Stack
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box component={tab.component} />
                  </Stack>
                </TabPanel>
              ))}
            </TabContext>
          </Stack>
        </Card>
      </Layout>
    </ThemeProvider>
  )
}
