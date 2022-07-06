import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { Markdown } from '../../base/Markdown'
import { SettingsHeader } from '../Header'
import markdown from '../../../markdown/settings/帮助.md?raw'

export const Help = () => (
  <Fragment>
    <SettingsHeader
      title="帮助与常见问题"
      href="https://github.com/QingLianJie/Lab"
    />
    <Stack
      sx={{
        px: { xs: 2.5, md: 3 },
        py: 2.5,
        '& details': { maxWidth: 620 },
        '& h6': { color: 'text.secondary' },
      }}
    >
      <Markdown>{markdown}</Markdown>
    </Stack>
  </Fragment>
)
