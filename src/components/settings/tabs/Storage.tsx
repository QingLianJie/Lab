import { Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { SettingsHeader } from '../Header'

export const Storage = () => (
  <Fragment>
    <SettingsHeader title="数据存储管理" help="/settings?tab=help#storage" />
    <Stack sx={{ px: { xs: 2.5, md: 3 }, py: 2.5 }}>
      <Typography>正在计算存储的数据</Typography>
    </Stack>
  </Fragment>
)
