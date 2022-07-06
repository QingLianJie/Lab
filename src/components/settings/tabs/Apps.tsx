import { Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { SettingsHeader } from '../Header'

export const Apps = () => (
  <Fragment>
    <SettingsHeader title="插件与 App" help="/settings?tab=help#apps" />
    <Stack sx={{ px: { xs: 2.5, md: 3 }, py: 2.5 }}>
      <Typography>当前没有检测到插件</Typography>
    </Stack>
  </Fragment>
)
