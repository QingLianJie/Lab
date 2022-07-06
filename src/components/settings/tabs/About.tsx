import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { info } from '../../../configs/site-info'
import { SettingsHeader } from '../Header'

export const About = () => (
  <Fragment>
    <SettingsHeader title={`关于${info.name}`} />
    <Stack sx={{ px: 3, py: 2 }}></Stack>
  </Fragment>
)
