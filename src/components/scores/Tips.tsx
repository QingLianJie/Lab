import {
  RestartAltOutlined,
  FileUploadOutlined,
  CheckOutlined,
} from '@mui/icons-material'
import {
  Alert,
  AlertTitle,
  Backdrop,
  IconButton,
  Link,
  Portal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { green } from '@mui/material/colors'
import confetti from 'canvas-confetti'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { Fragment, useState } from 'react'
import { type ScoreColumnKey } from '../../configs/scores/columns'
import { scoresViewAtom } from '../../contexts/bridge/scores'
import { Confirm } from '../base/Modal'
import { Tooltip } from '../base/styled/Tooltip'

const defaultColumns = ['name', 'type', 'credit', 'nature', 'score']

export const ScoresSimpleTips = () => {
  const [scoresView, setScoresView] = useAtom(scoresViewAtom)
  const [columns, setColumns] = useState<ScoreColumnKey[]>(
    defaultColumns as ScoreColumnKey[]
  )

  const handleClick = () => {
    if (scoresView.simple) {
      setScoresView({ ...scoresView, columns, simple: false })
      setColumns([])
    } else {
      setColumns(scoresView.columns)
      setScoresView({ ...scoresView, columns: ['name', 'score'], simple: true })
    }
  }

  return (
    <Alert
      severity={scoresView.simple ? 'success' : 'info'}
      color="success"
      variant="outlined"
      action={
        <IconButton
          aria-label={scoresView.simple ? '还原' : '切换'}
          size="small"
          color="inherit"
          onClick={handleClick}
          sx={{ my: -0.5 }}
        >
          {scoresView.simple ? <RestartAltOutlined /> : <CheckOutlined />}
        </IconButton>
      }
      sx={{ backgroundColor: 'background.paper' }}
    >
      {scoresView.simple
        ? '已切换到精简模式，可以随时点击右侧按钮还原，或者点击下方小眼睛按钮自定义表格列。'
        : '检测到你的屏幕比较小，查看成绩较为不便，是否切换到精简模式，只显示课程名称和成绩？'}
    </Alert>
  )
}

export const ScoresUploadTips = () => {
  const [open, setOpen] = useState(false)
  const [thanks, setThanks] = useState(false)
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))

  const handleUpload = () => {
    enqueueSnackbar('这个功能还没做')
    setOpen(false)
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
    <Fragment>
      <Alert
        severity="info"
        color="success"
        variant="outlined"
        action={
          <Tooltip title="上传成绩" arrow placement="top">
            <IconButton
              aria-label="上传"
              size="small"
              color="inherit"
              sx={{ my: -0.5, mx: 0.5 }}
              onClick={() => setOpen(true)}
            >
              <FileUploadOutlined />
            </IconButton>
          </Tooltip>
        }
        sx={{ backgroundColor: 'background.paper' }}
      >
        <AlertTitle sx={{ fontWeight: 700 }}>
          欢迎上传成绩到清廉街数据库
        </AlertTitle>
        新版清廉街修改了学校数据的获取方式，数据不再经过清廉街服务器，因此清廉街无法主动获取到成绩和课表数据，你可以通过点击右侧按钮，将自己的成绩以匿名的方式上传到清廉街，帮助清廉街完善课程和成绩数据库，非常感谢你的贡献。
        <Link href="" target="_blank" rel="noopener noreferrer">
          了解更多
        </Link>
      </Alert>
      <Confirm
        open={open}
        onConfirm={handleUpload}
        onClose={() => setOpen(false)}
        title="上传成绩"
        description="确认将匿名成绩上传到清廉街？"
      />
      <Portal>
        <Thanks thanks={thanks} onClose={() => setThanks(false)} />
      </Portal>
    </Fragment>
  )
}

interface ThanksProps {
  thanks: boolean
  onClose: () => void
}

const Thanks = ({ thanks, onClose }: ThanksProps) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 5000, mt: 0 }}
      open={thanks}
      onClick={onClose}
    >
      <Stack spacing={2} sx={{ mb: { xs: 4, sm: 0 } }}>
        <Typography
          variant="h1"
          component="span"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            textShadow: '0 0 2rem rgba(0,0,0,0.1)',
            userSelect: 'none',
          }}
        >
          ❤️
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            textShadow: '0 0 2rem rgba(0,0,0,0.3)',
            userSelect: 'none',
          }}
        >
          感谢你的贡献
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            textShadow: '0 0 2rem rgba(0,0,0,0.3)',
            userSelect: 'none',
          }}
        >
          点击任意处关闭
        </Typography>
      </Stack>
    </Backdrop>
  )
}
