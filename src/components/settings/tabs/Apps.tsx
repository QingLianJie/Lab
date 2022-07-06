import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { SettingsHeader } from '../Header'

export const Apps = () => (
  <Fragment>
    <SettingsHeader title="插件与 App" />
    <Stack sx={{ px: 3, py: 2 }}></Stack>
  </Fragment>
)
