import { CheckOutlined, RestartAltOutlined } from '@mui/icons-material'
import {
  Alert,
  Backdrop,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import confetti from 'canvas-confetti'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { type ScoreColumnKey } from '../../configs/scores/columns'
import { modalsAtom } from '../../contexts/modals'
import { scoresViewAtom } from '../../contexts/scores'

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
          sx={{ my: -0.25 }}
        >
          {scoresView.simple ? (
            <RestartAltOutlined sx={{ width: 22, height: 22 }} />
          ) : (
            <CheckOutlined sx={{ width: 22, height: 22 }} />
          )}
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

export const Thanks = () => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const [modals, setModals] = useAtom(modalsAtom)

  useEffect(() => {
    if (!modals.thanks) return
    createConfetti()
  }, [modals.thanks])

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
    <Backdrop
      sx={{ color: '#fff', zIndex: 5000, mt: 0 }}
      open={modals.thanks}
      onClick={() => setModals({ ...modals, thanks: false })}
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
