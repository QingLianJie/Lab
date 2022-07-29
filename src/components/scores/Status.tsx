import { RefreshOutlined } from '@mui/icons-material'
import { Card, IconButton, Link, Stack, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { modalsAtom } from '../../contexts/booleans'
import { bridgeAtom, studentAtom } from '../../contexts/bridge'
import { scoresAtom } from '../../contexts/bridge/scores'
import { calendarTime } from '../../utils/format'
import { Tooltip } from '../base/Tooltip'
import { GoAction } from '../settings/Fetch'

export const Status = () => {
  const scores = useAtomValue(scoresAtom)

  const [modals, setModals] = useAtom(modalsAtom)
  const bridge = useAtomValue(bridgeAtom)
  const student = useAtomValue(studentAtom)

  const handleFetch = () => {
    if (!bridge)
      enqueueSnackbar('未安装插件，请前往设置页面安装', {
        action: <GoAction name="extension" />,
      })
    else if (!student)
      enqueueSnackbar('未添加 HEU 账号，请前往设置页面添加', {
        action: <GoAction name="bridge" />,
      })
    else setModals({ ...modals, captcha: true })
  }

  return (
    <Card variant="outlined">
      <Stack spacing={0.5} sx={{ position: 'relative', px: 2, py: 1.75 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          数据更新于
        </Typography>
        <Typography variant="body1" component="time" sx={{ fontWeight: 700 }}>
          {scores ? calendarTime(scores.date) : '未知时间'}
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
              right: 8,
              top: 2,
              color: 'text.disabled',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s',
            }}
            onClick={handleFetch}
          >
            <RefreshOutlined />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  )
}
