import { Stack, TextareaAutosize, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { useDebounce } from 'react-use'
import { settingsAtom } from '../../../contexts/settings'
import { SettingsHeader } from '../Header'

export const Developer = () => {
  const [settings, setSettings] = useAtom(settingsAtom)

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
      <Stack sx={{ px: { xs: 2.5, md: 3 }, py: { xs: 2, md: 2.5 } }}>
        <TextField
          id="css"
          label="自定义 CSS"
          multiline
          minRows={4}
          defaultValue={settings.developer.css}
          size="small"
          margin="dense"
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
          margin="dense"
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
    </Fragment>
  )
}
