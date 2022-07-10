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
} from '@mui/material'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { ChangeEvent, Fragment, useRef, useState } from 'react'
import { storages } from '../../../configs/settings/storages'
import { bridgeAtom, schedulesAtom, scoresAtom } from '../../../contexts/bridge'
import { defaultSettings, settingsAtom } from '../../../contexts/settings'
import markdown from '../../../markdown/settings/storage.md?raw'
import { byteFormat } from '../../../utils/format'
import { Confirm } from '../../base/Confirm'
import { Markdown } from '../../base/Markdown'
import { SettingsHeader } from '../Header'

export const Storage = () => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [settings, setSettings] = useAtom(settingsAtom)
  const [bridge, setBridge] = useAtom(bridgeAtom)
  const [schedules, setSchedules] = useAtom(schedulesAtom)
  const [scores, setScores] = useAtom(scoresAtom)

  const [isLoading, setLoading] = useState(false)

  const handleExport = () => {
    const data = { settings, bridge, schedules, scores }
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
        setBridge(data.bridge)
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
    setOpen(false)
    setSettings(defaultSettings)
    setBridge(false)
    setSchedules(false)
    setScores(false)
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
              onClick={() => setOpen(true)}
            >
              清空数据
            </Button>

            <Confirm
              open={open}
              onConfirm={handleRemove}
              onClose={() => setOpen(false)}
              title="确认清空数据吗？"
              description="这个操作不可恢复，请谨慎操作。"
              isDanger
            />
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
                      sx={{ color: 'text.disabled' }}
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
