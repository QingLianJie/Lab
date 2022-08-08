import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Card,
  Icon,
  Stack,
  Tab,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { amber } from '@mui/material/colors'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { settingsTabs } from '../../configs/settings/tabs'

export const SettingsTab = () => {
  const theme = useTheme()
  const { breakpoints, palette } = theme
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const isDark = palette.mode === 'dark'

  const [params, setParams] = useSearchParams()
  const { pathname } = useLocation()
  const [currentTab, setTab] = useState(params.get('tab') || 'dashboard')

  useEffect(() => {
    if (pathname !== '/settings') return
    const tab = params.get('tab')
    if (tab) setTab(tab)
    else setTab('dashboard')
  }, [params])

  const handleChange = (_event: SyntheticEvent, value: string) => {
    if (value === 'dashboard') setParams({})
    else setParams({ tab: value })
  }

  return (
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
        <Stack
          direction="row"
          spacing={{ xs: 0, sm: 2 }}
          sx={{ width: '100%', flex: 1 }}
        >
          <Card
            variant="outlined"
            sx={{
              position: { xs: 'absolute', sm: 'relative' },
              width: { xs: 64, md: '20%' },
              minWidth: { xs: 48, md: 180 },
              height: 'auto',
              display: 'flex',
              opacity: { xs: 0, sm: 1 },
              visibility: { xs: 'hidden', sm: 'visible' },
              pointerEvents: { xs: 'none', sm: 'auto' },
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              orientation="vertical"
              sx={{
                py: { xs: 0.5, md: 1 },
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
                  key={tab.id}
                  aria-label={tab.name}
                  label={
                    <Typography
                      sx={{
                        pl: { xs: 0, md: 1 },
                        display: { xs: 'none', md: 'flex' },
                      }}
                    >
                      {tab.short}
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
                  sx={{
                    minHeight: { xs: 52, md: 48 },
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
          </Card>
          <Card
            variant="outlined"
            sx={{ flex: 1, height: 'auto', display: 'flex' }}
          >
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
          </Card>
        </Stack>
      </TabContext>
    </Stack>
  )
}
