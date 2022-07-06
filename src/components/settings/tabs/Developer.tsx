import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { Markdown } from '../../base/Markdown'
import { SettingsHeader } from '../Header'
import markdown from '../../../markdown/settings/开发者选项.md?raw'

export const Developer = () => (
  <Fragment>
    <SettingsHeader title="开发者选项" />
    <Stack sx={{ px: { xs: 2.5, md: 3 }, py: 2.5 }}>
      <Markdown>{markdown}</Markdown>
    </Stack>
  </Fragment>
)
