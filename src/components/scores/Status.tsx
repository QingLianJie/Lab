import { RefreshOutlined } from '@mui/icons-material'
import { Card, IconButton, Link, Stack, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { bridgeAtom, studentAtom } from '../../contexts/bridge'
import { modalsAtom } from '../../contexts/modals'
import { scoresAtom } from '../../contexts/scores'
import { calendarTime } from '../../utils/format'
import { Tooltip } from '../base/styled/Tooltip'
import { SettingsGoAction } from '../settings/Fetch'

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
    </Card>
  )
}
