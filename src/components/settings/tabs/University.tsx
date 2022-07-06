import { Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { SettingsHeader } from '../Header'

export const University = () => (
  <Fragment>
    <SettingsHeader title="HEU 账号" help="/settings?tab=help#university" />
    <Stack sx={{ px: { xs: 2.5, md: 3 }, py: 2.5 }}>
      <Typography>当前没有记录 HEU 账号</Typography>
    </Stack>
  </Fragment>
)
