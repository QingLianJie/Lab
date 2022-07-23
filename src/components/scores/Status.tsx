import { RefreshOutlined } from '@mui/icons-material'
import { Card, IconButton, Stack, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { modalsAtom } from '../../contexts/booleans'
import { scoresAtom } from '../../contexts/bridge/scores'
import { calendarTime } from '../../utils/format'
import { Tooltip } from '../base/Tooltip'

export const Status = () => {
  const scores = useAtomValue(scoresAtom)
  const [modals, setModals] = useAtom(modalsAtom)

  return (
    <Card variant="outlined">
      <Stack spacing={0.5} sx={{ position: 'relative', p: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          数据更新于
        </Typography>
        <Typography variant="body1" component="time" sx={{ fontWeight: 700 }}>
          {scores ? calendarTime(scores.date) : '未知时间'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {scores ? `${scores.id} 的成绩` : '未知 ID'}
        </Typography>
        <Tooltip title="重新获取数据" placement="top" arrow>
          <IconButton
            aria-label="重新获取数据"
            sx={{ position: 'absolute', right: 8, top: 2 }}
            onClick={() => setModals({ ...modals, captcha: true })}
          >
            <RefreshOutlined />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  )
}
