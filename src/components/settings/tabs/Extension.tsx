import { ExtensionOutlined } from '@mui/icons-material'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { amber } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { bridgeAtom, fetcherAtom } from '../../../contexts/bridge'
import { SettingsHeader } from '../Header'

const fetcherMap = (name: string) => {
  switch (name) {
    case 'userscript':
      return '用户脚本'
    case 'android':
      return 'Android'
    default:
      return '未知插件'
  }
}
export const Extension = () => {
  const bridge = useAtomValue(bridgeAtom)
  const fetcher = useAtomValue(fetcherAtom)

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
          <Fragment>
            <Typography
              variant="body1"
              component="span"
              sx={{ color: 'text.secondary', textAlign: 'center' }}
            >
              已连接到插件
            </Typography>
            <Typography
              variant="h5"
              component="span"
              sx={{
                color: 'text.primary',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              {fetcher
                ? `${fetcherMap(fetcher.name)} ${fetcher.version}`
                : '未知插件'}
            </Typography>
          </Fragment>
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
            获取插件
          </Button>
        </Stack>
      </Stack>
    </Fragment>
  )
}
