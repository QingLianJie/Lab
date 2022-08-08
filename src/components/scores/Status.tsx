import {
  AddOutlined,
  FileUploadOutlined,
  RefreshOutlined,
} from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  Divider,
  IconButton,
  Link,
  Portal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { modalsAtom } from '../../contexts/modals'
import { bridgeAtom, studentAtom } from '../../contexts/bridge'
import { scoresAtom } from '../../contexts/scores'
import { calendarTime } from '../../utils/format'
import { Tooltip } from '../base/styled/Tooltip'
import { SettingsGoAction } from '../settings/Fetch'
import confetti from 'canvas-confetti'
import { useState } from 'react'
import { Thanks } from './Tips'

export const ScoresStatus = () => {
  const scores = useAtomValue(scoresAtom)

  const [modals, setModals] = useAtom(modalsAtom)
  const bridge = useAtomValue(bridgeAtom)
  const student = useAtomValue(studentAtom)

  const handleFetch = () => {
    if (!bridge)
      enqueueSnackbar('未安装插件，请前往设置页面安装', {
        action: <SettingsGoAction name="extension" />,
      })
    else if (!student)
      enqueueSnackbar('未添加 HEU 账号，请前往设置页面添加', {
        action: <SettingsGoAction name="bridge" />,
      })
    else setModals({ ...modals, captcha: true })
  }

  const [thanks, setThanks] = useState(false)
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))

  const handleUpload = () => {
    const ans = confirm(
      '上传匿名成绩，可以帮助清廉街完善课程数据库，确认将匿名成绩上传到清廉街？'
    )
    if (!ans) return
    enqueueSnackbar('这个功能还没做')
    createConfetti()
    setThanks(true)
  }

  const createConfetti = () => {
    const end = Date.now() + 2 * 1000

    ;(function frame() {
      confetti({
        particleCount: 5,
        angle: isMobile ? 85 : 60,
        spread: 72,
        origin: { x: 0, y: isMobile ? 0.75 : 0.5 },
        zIndex: 9999,
      })
      confetti({
        particleCount: 5,
        angle: isMobile ? 95 : 120,
        spread: 72,
        origin: { x: 1, y: isMobile ? 0.75 : 0.5 },
        zIndex: 9999,
      })

      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }

  return (
    <Card variant="outlined">
      <Stack spacing={0.5} sx={{ position: 'relative', px: 2.25, py: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          成绩数据更新于
        </Typography>
        <Typography variant="body1" component="time" sx={{ fontWeight: 700 }}>
          {scores ? calendarTime(scores.date) : '未知时间'}
          {' ｜ '}
          {scores ? scores.scores.length : 0} 个成绩
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {scores ? `${scores.id} 的成绩` : '未知 ID'}
          <Link
            href="https://edusys.wvpn.hrbeu.edu.cn/jsxsd/kscj/cjcx_list"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ pl: 1 }}
          >
            查看
          </Link>
        </Typography>

        <Tooltip title="重新获取数据" arrow placement="top">
          <IconButton
            aria-label="重新获取数据"
            sx={{
              position: 'absolute',
              right: 6,
              top: 2,
              color: 'text.disabled',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s',
            }}
            onClick={handleFetch}
          >
            <RefreshOutlined sx={{ width: 24, height: 24 }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />
      <CardActionArea onClick={handleUpload}>
        <Stack
          spacing={1.5}
          direction="row"
          sx={{
            pl: 2.25,
            pr: 2,
            py: 1.5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            上传匿名成绩
          </Typography>
          <FileUploadOutlined
            sx={{ color: 'text.disabled', width: 20, height: 20 }}
          />
        </Stack>
      </CardActionArea>

      <Portal>
        <Thanks thanks={thanks} onClose={() => setThanks(false)} />
      </Portal>
    </Card>
  )
}
