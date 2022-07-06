import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { SettingsHeader } from '../Header'

export const Appearance = () => (
  <Fragment>
    <SettingsHeader title="网站外观" />
    <Stack sx={{ px: 3, py: 2 }}></Stack>
  </Fragment>
)
