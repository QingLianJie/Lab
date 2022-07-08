import { Divider, Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { SettingsHeader } from '../Header'
import markdown from '../../../markdown/settings/storage.md?raw'
import { Markdown } from '../../base/Markdown'

export const Storage = () => (
  <Fragment>
    <SettingsHeader title="数据存储管理" help="/settings?tab=help#storage" />
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      divider={
        <Divider
          orientation="vertical"
          sx={{
            height: { xs: 'auto', sm: '100%' },
            width: { xs: '100%', sm: 'auto' },
            borderBottomWidth: { xs: 1, sm: 0 },
            borderBottomColor: 'divider',
          }}
        />
      }
      sx={{ height: '100%' }}
    >
      <Stack
        sx={{
          flex: 1,
          px: { xs: 2.5, md: 3 },
          py: { xs: 2, md: 2.5 },
          fontSize: '0.925rem',
        }}
      >
        <Markdown>{markdown}</Markdown>
      </Stack>
      <Stack sx={{ flex: 1 }}></Stack>
    </Stack>
  </Fragment>
)
