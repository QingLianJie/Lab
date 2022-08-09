import { ExtensionOutlined, ExtensionRounded } from '@mui/icons-material'
import { Button, Chip, Stack, Typography } from '@mui/material'
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
export const SettingsExtension = () => {
  const bridge = useAtomValue(bridgeAtom)
  const fetcher = useAtomValue(fetcherAtom)

  return (
    <Fragment>
      <SettingsHeader
        title="插件与 App"
        help="/settings?tab=help#extension"
        icon={ExtensionOutlined}
      />
      <Stack
        spacing={0.5}
        sx={{
          flex: 1,
          height: '100%',
          px: { xs: 2.5, md: 3 },
          py: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ExtensionRounded
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            color: bridge ? 'primary.main' : 'action.selected',
            transition: 'color 0.2s',
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
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {fetcher ? (
                <Fragment>
                  {fetcherMap(fetcher.name)}
                  <Chip
                    label={fetcher.version}
                    sx={{ ml: 1, height: 30, fontSize: 'body1.fontSize' }}
                  />
                </Fragment>
              ) : (
                '未知插件'
              )}
            </Typography>
          </Fragment>
        ) : (
          <Fragment>
            <Typography
              variant="h6"
              component="span"
              sx={{
                color: 'text.primary',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              未发现可用插件
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ color: 'text.secondary', textAlign: 'center' }}
            >
              通过插件来获取成绩和课表数据
            </Typography>
          </Fragment>
        )}

        <Stack direction="row" sx={{ py: 1 }}>
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
