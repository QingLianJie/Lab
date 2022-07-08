import { Stack } from '@mui/material'
import { Fragment } from 'react'
import markdown from '../../../markdown/settings/开源.md?raw'
import { Markdown } from '../../base/Markdown'
import { SettingsHeader } from '../Header'

export const OpenSource = () => (
  <Fragment>
    <SettingsHeader
      title="开源软件与协议"
      help="/settings?tab=help#open-source"
    />
    <Stack sx={{ px: { xs: 2.5, md: 3 }, py: { xs: 2, md: 2.5 } }}>
      <Markdown>{markdown}</Markdown>
    </Stack>
  </Fragment>
)
