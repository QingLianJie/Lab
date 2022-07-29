import {
  Alert,
  Divider,
  Link,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { amber, indigo } from '@mui/material/colors'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDebounce } from 'react-use'
import markdown from '../../../../README.md?raw'
import { settingsAtom } from '../../../contexts/settings'
import { Markdown } from '../../base/Markdown'
import { SettingsHeader } from '../Header'

export const SettingsDeveloper = () => {
  const [settings, setSettings] = useAtom(settingsAtom)
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  useDebounce(
    () => {
      const style = document.querySelector('style#custom-css')
      if (style) style.innerHTML = settings.developer.css
    },
    500,
    [settings.developer.css]
  )

  return (
    <Fragment>
      <SettingsHeader title="开发者选项" help="/settings?tab=help#developer" />

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
          spacing={2}
          sx={{ flex: 1, px: { xs: 2.5, md: 3 }, py: { xs: 2, md: 2.5 } }}
        >
          <Stack spacing={1.5} sx={{ flex: 1 }}>
            <Alert
              severity="warning"
              sx={{ mb: 1.5, border: 1, borderColor: amber[400] }}
            >
              修改开发者选项可能会导致网页出现异常，请不要将未知的代码或者链接填入下方输入框！
            </Alert>
            <TextField
              id="css"
              label="自定义 CSS"
              multiline
              minRows={4}
              defaultValue={settings.developer.css}
              size="small"
              helperText="输入自定义 CSS 代码，修改网站样式"
              sx={{
                '& textarea': { fontFamily: 'code.fontFamily' },
                '&.MuiFormControl-root': { mt: 0.5 },
              }}
              onChange={e =>
                setSettings(s => ({
                  ...s,
                  developer: {
                    ...s.developer,
                    css: e.target.value,
                  },
                }))
              }
              inputProps={{ component: TextareaAutosize }}
            />

            <TextField
              id="api"
              label="后端 API 地址"
              defaultValue={settings.developer.api}
              size="small"
              sx={{ fontFamily: 'code.fontFamily' }}
              onChange={e =>
                setSettings(s => ({
                  ...s,
                  developer: {
                    ...s.developer,
                    api: e.target.value,
                  },
                }))
              }
            />
          </Stack>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              如果你对程序开发感兴趣，欢迎{' '}
              <Link
                component={RouterLink}
                to="/settings?tab=contact"
                sx={{ color: indigo[isDark ? 200 : 500] }}
              >
                加入我们
              </Link>
              。
            </Typography>
          </Stack>
        </Stack>

        <Stack
          spacing={2.5}
          sx={{
            flex: 1,
            px: { xs: 2.5, md: 3 },
            py: { xs: 2, md: 2.5 },
            fontSize: '0.925rem',
          }}
        >
          <Markdown>{markdown}</Markdown>
        </Stack>
      </Stack>
    </Fragment>
  )
}
