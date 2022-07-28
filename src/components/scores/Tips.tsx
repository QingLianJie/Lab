import {
  RestartAltOutlined,
  FileUploadOutlined,
  CheckOutlined,
} from '@mui/icons-material'
import { Alert, IconButton, Link } from '@mui/material'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { ScoreColumnKey } from '../../configs/scores/columns'
import { scoresViewAtom } from '../../contexts/bridge/scores'
import { Tooltip } from '../base/Tooltip'

const defaultColumns = ['name', 'type', 'credit', 'nature', 'score']

export const SimpleTips = () => {
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
      variant="outlined"
      color="success"
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
    >
      {scoresView.simple
        ? '已切换到精简模式，可以随时点击右侧按钮还原，或者点击下方小眼睛按钮自定义表格列。'
        : '检测到你的屏幕比较小，查看成绩较为不便，是否切换到精简模式，只显示课程名称和成绩？'}
    </Alert>
  )
}

export const UploadTips = () => {
  return (
    <Alert
      severity="info"
      variant="outlined"
      color="success"
      action={
        <Tooltip title="上传成绩" arrow placement="top">
          <IconButton
            aria-label="上传"
            size="small"
            color="inherit"
            sx={{ my: -0.5, mx: 0.5 }}
          >
            <FileUploadOutlined />
          </IconButton>
        </Tooltip>
      }
    >
      清廉街改版后无法主动获得成绩和课程等数据，大家可以自行选择是否将自己的成绩匿名上传到清廉街，帮助清廉街完善课程数据库，非常感谢。
      <Link
        href=""
        target="_blank"
        rel="noopener noreferrer"
        sx={{ textDecoration: 'none' }}
      >
        了解更多
      </Link>
    </Alert>
  )
}
