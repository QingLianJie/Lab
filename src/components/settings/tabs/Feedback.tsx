import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { Markdown } from '../../base/Markdown'
import { SettingsHeader } from '../Header'
import markdown from '../../../markdown/settings/联系我们.md?raw'

export const Feedback = () => (
  <Fragment>
    <SettingsHeader title="联系我们" help="/settings?tab=help#feedback" />
    <Stack sx={{ px: { xs: 2.5, md: 3 }, py: 2.5 }}>
      <Markdown>{markdown}</Markdown>
    </Stack>
  </Fragment>
)
