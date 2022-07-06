import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { info } from '../../../configs/site-info'
import { SettingsHeader } from '../Header'

export const Qing = () => (
  <Fragment>
    <SettingsHeader title={`${info.name}账号`} />
    <Stack sx={{ px: 3, py: 2 }}></Stack>
  </Fragment>
)
