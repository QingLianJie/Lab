import { ButtonBase, Grid, Icon, Stack, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { settingsTabs } from '../../configs/settings/tabs'

export const SettingsDashboard = () => {
  const [params, setParams] = useSearchParams()
  const filterdTabs = settingsTabs.filter(tab => tab.dashboard)
  const len = filterdTabs.length

  const handleParams = (params: string) => {
    if (params === 'dashboard') setParams({})
    else setParams({ tab: params })
  }

  return (
    <Grid container sx={{ flex: 1 }}>
      {filterdTabs.map((tab, index) => (
        <Grid item key={tab.id} xs={12} sm={6} md={4} lg={3}>
          <Stack
            component={ButtonBase}
            direction={{ xs: 'row', sm: 'column' }}
            onClick={() => handleParams(tab.id)}
            sx={{
              position: 'relative',
              flex: 1,
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: { xs: 'center', sm: 'flex-start' },
              justifyContent: 'space-between',
              px: { xs: 2, sm: 2.5 },
              py: { xs: 1.75, sm: 2 },
              borderColor: 'divider',
              borderStyle: 'solid',
              borderRightWidth: {
                xs: 0,
                sm: index % 2 === 1 ? 0 : 1,
                md: index % 3 === 2 ? 0 : 1,
                lg: index % 4 === 3 ? 0 : 1,
              },
              borderBottomWidth: {
                xs: index === len - 1 ? 0 : 1,
                sm: index >= len - (len % 2 || 2) ? 0 : 1,
                md: index >= len - (len % 3 || 3) ? 0 : 1,
                lg: index >= len - (len % 4 || 4) ? 0 : 1,
              },
              '&:hover': { backgroundColor: 'action.hover' },
              transition: 'all 0.2s',
            }}
          >
            <Stack
              spacing={0.25}
              direction={{ xs: 'row', sm: 'column' }}
              sx={{ alignItems: 'flex-start' }}
            >
              <Icon
                component={tab.icon[0]}
                sx={{
                  position: { xs: 'relative', sm: 'absolute' },
                  right: { xs: 'unset', sm: 20 },
                  bottom: { xs: 'unset', sm: 16 },
                  color: { xs: 'text.disabled', sm: 'action.selected' },
                  width: { xs: 24, sm: 48 },
                  height: { xs: 24, sm: 48 },
                  mr: { xs: 1.5, sm: 0 },
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  fontWeight: { xs: 500, sm: 700 },
                  fontSize: { xs: 'body1.fontSize', sm: 'h6.fontSize' },
                }}
              >
                {tab.name}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                {tab.description}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'code.fontFamily',
                color: 'text.disabled',
                mt: { xs: 0, sm: 3 },
              }}
            >
              /{tab.id}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
}
