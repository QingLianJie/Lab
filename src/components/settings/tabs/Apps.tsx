import { ExtensionOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { SettingsHeader } from '../Header'

export const Apps = () => (
  <Fragment>
    <SettingsHeader title="插件与 App" help="/settings?tab=help#apps" />
    <Stack
      spacing={0.5}
      sx={{
        flex: 1,
        height: '100%',
        px: { xs: 2.5, md: 3 },
        py: 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ExtensionOutlined
        sx={{ width: 108, height: 108, mb: 2, color: 'action.selected' }}
      />
      <Typography
        variant="h6"
        component="span"
        sx={{ color: 'text.disabled', textAlign: 'center' }}
      >
        没有检测到插件或 App
      </Typography>
      <Stack direction="row" sx={{ pb: 1 }}>
        <Button
          variant="text"
          disableElevation
          color="info"
          href=""
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            minWidth: 'unset',
            py: 0.75,
            px: 1.5,
            textTransform: 'none',
          }}
        >
          获取插件或 App
        </Button>
      </Stack>
    </Stack>
  </Fragment>
)
