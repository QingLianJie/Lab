import { Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { info } from '../../../configs/site-info'
import { SettingsHeader } from '../Header'

export const Qing = () => (
  <Fragment>
    <SettingsHeader title={`${info.name}账号`} help="/settings?tab=help#qing" />
    <Stack sx={{ px: { xs: 2.5, md: 3 }, py: 2.5 }}>
      <Typography>当前没有登录{info.name}账号</Typography>
    </Stack>
  </Fragment>
)
