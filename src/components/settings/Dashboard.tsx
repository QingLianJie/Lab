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
        <Grid item key={tab.id} xs={6} sm={4} lg={3}>
          <Stack
            component={ButtonBase}
            direction="column"
            onClick={() => handleParams(tab.id)}
            sx={{
              position: 'relative',
              flex: 1,
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              px: { xs: 2, sm: 2.5 },
              py: { xs: 1.75, sm: 2 },
              borderColor: 'divider',
              borderStyle: 'solid',
              borderRightWidth: {
                xs: index % 2 === 1 ? 0 : 1,
                sm: index % 3 === 2 ? 0 : 1,
                lg: index % 4 === 3 ? 0 : 1,
              },
              borderBottomWidth: {
                xs: index >= len - (len % 2 || 2) ? 0 : 1,
                sm: index >= len - (len % 3 || 3) ? 0 : 1,
                lg: index >= len - (len % 4 || 4) ? 0 : 1,
              },
              '&:hover': { backgroundColor: 'action.hover' },
              transition: 'all 0.2s',
            }}
          >
            <Stack
              spacing={0.5}
              direction="column"
              sx={{
                alignItems: 'flex-start',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <Icon
                component={tab.icon[0]}
                sx={{
                  position: 'absolute',
                  right: { xs: 14, md: 20 },
                  bottom: { xs: 14, md: 16 },
                  color: 'action.disabled',
                  width: 24,
                  height: 24,
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 'body1.fontSize', md: '1.125rem' },
                }}
              >
                {tab.name}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  width: '100%',
                  color: 'text.secondary',
                  fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {tab.description}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'code.fontFamily',
                fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                color: 'action.disabled',
                userSelect: 'none',
                mt: { xs: 2, md: 3 },
              }}
            >
              {tab.id}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
}
