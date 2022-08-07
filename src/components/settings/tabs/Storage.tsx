import {
  DeleteOutlineOutlined,
  FileDownloadOutlined,
  FileUploadOutlined,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { ChangeEvent, Fragment, useRef, useState } from 'react'
import { storages } from '../../../configs/settings/storages'
import { studentAtom } from '../../../contexts/bridge'
import { schedulesAtom } from '../../../contexts/schedules'
import { scoresAtom } from '../../../contexts/scores'
import { defaultSettings, settingsAtom } from '../../../contexts/settings'
import markdown from '../../../markdown/settings/storage.md?raw'
import { byteFormat } from '../../../utils/format'
import { Confirm } from '../../base/Modal'
import { Markdown } from '../../base/Markdown'
import { SettingsHeader } from '../Header'

export const SettingsStorage = () => {
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  const inputRef = useRef<HTMLInputElement>(null)

  const [settings, setSettings] = useAtom(settingsAtom)
  const [student, setStudent] = useAtom(studentAtom)
  const [schedules, setSchedules] = useAtom(schedulesAtom)
  const [scores, setScores] = useAtom(scoresAtom)

  const [isLoading, setLoading] = useState(false)

  const handleExport = () => {
    const data = { settings, student, schedules, scores }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'text/json',
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `清廉街数据导出 ${new Date().toISOString()}.json`

    link.dispatchEvent(
      new MouseEvent('click', { view: window, bubbles: true, cancelable: true })
    )
    link.remove()
  }

  const handleImport = (e: ChangeEvent) => {
    setLoading(true)
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        setSettings(data.settings)
        setStudent(data.student)
        setSchedules(data.schedules)
        setScores(data.scores)
        setLoading(false)
        enqueueSnackbar(`导入成功：${file?.name}`, { variant: 'success' })
      } catch (error) {
        console.error(error)
        enqueueSnackbar(`导入失败：${file?.name}`, { variant: 'error' })
        setLoading(false)
      }
    }
    reader.readAsText(file as Blob)
  }

  const handleRemove = () => {
    const ans = confirm('确定要清空所有数据吗？这个操作不可恢复，请谨慎操作。')
    if (!ans) return

    setSettings(defaultSettings)
    setStudent(false)
    setSchedules(false)
    setScores(false)
    localStorage.clear()
    alert('已清空数据，需要重新加载页面才能生效。')
    location.reload()
  }

  const calcStorage = (id: string) => {
    const data = localStorage.getItem(id)
    if (!data) return false
    return byteFormat(data.length)
  }

  return (
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
            px: { xs: 1.5, md: 2 },
            pt: { xs: 2, md: 2.5 },
            pb: { xs: 1, md: 1.5 },
            fontSize: '0.925rem',
          }}
        >
          <Box sx={{ px: 1 }}>
            <Markdown>{markdown}</Markdown>
          </Box>

          <Stack
            direction="row"
            sx={{ pt: 2, flex: 1, alignItems: 'flex-end' }}
          >
            <Stack direction="row" sx={{ flex: 1 }}>
              <Button
                startIcon={<FileDownloadOutlined />}
                onClick={handleExport}
              >
                导出
              </Button>

              <input
                ref={inputRef}
                accept="application/json"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImport}
              />
              <LoadingButton
                startIcon={<FileUploadOutlined />}
                loading={isLoading}
                loadingPosition="start"
                onClick={() => inputRef.current?.click()}
              >
                导入
              </LoadingButton>
            </Stack>

            <Button
              color="error"
              startIcon={<DeleteOutlineOutlined />}
              onClick={handleRemove}
            >
              清空数据
            </Button>
          </Stack>
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <List disablePadding>
            {storages.map(storage => (
              <Fragment key={storage.id}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 'unset', mr: 2 }}>
                    <Icon
                      component={storage.icon}
                      sx={{ color: storage.color[isDark ? 1 : 0] }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={storage.name}
                    secondary={storage.description}
                  />
                  {calcStorage(storage.id) ? (
                    <Typography
                      sx={{ px: 1, fontWeight: 700, fontSize: 'h6.fontSize' }}
                    >
                      {calcStorage(storage.id)}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ px: 1, fontWeight: 700, color: 'text.disabled' }}
                    >
                      无数据
                    </Typography>
                  )}
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </List>
        </Stack>
      </Stack>
    </Fragment>
  )
}
