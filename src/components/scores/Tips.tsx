import {
  CheckOutlined,
  FileUploadOutlined,
  RestartAltOutlined,
} from '@mui/icons-material'
import {
  Alert,
  Backdrop,
  IconButton,
  Link,
  Portal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import confetti from 'canvas-confetti'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { Fragment, useState } from 'react'
import { type ScoreColumnKey } from '../../configs/scores/columns'
import { scoresViewAtom } from '../../contexts/scores'
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

interface ThanksProps {
  thanks: boolean
  onClose: () => void
}

export const Thanks = ({ thanks, onClose }: ThanksProps) => {
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
