import { ExtensionOutlined } from '@mui/icons-material'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { amber } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { bridgeAtom } from '../../../contexts/bridge'
import { SettingsHeader } from '../Header'

export const Extension = () => {
  const bridge = useAtomValue(bridgeAtom)
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  return (
    <Fragment>
      <SettingsHeader title="插件与 App" help="/settings?tab=help#extension" />
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
          sx={{
            width: 108,
            height: 108,
            mb: 2,
            color: bridge ? amber[isDark ? 500 : 600] : 'action.selected',
          }}
        />
        {bridge ? (
          <Typography
            variant="h5"
            component="span"
            sx={{
              color: 'text.primary',
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            已连接到插件
          </Typography>
        ) : (
          <Typography
            variant="h6"
            component="span"
            sx={{ color: 'text.disabled', textAlign: 'center' }}
          >
            没有检测到插件或 App
          </Typography>
        )}

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
}
