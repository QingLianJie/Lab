import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { SettingsHeader } from '../Header'

export const Developer = () => (
  <Fragment>
    <SettingsHeader title="开发者选项" />
    <Stack sx={{ px: 3, py: 2 }}></Stack>
  </Fragment>
)
