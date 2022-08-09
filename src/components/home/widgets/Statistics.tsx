import {
  BrowseGalleryOutlined,
  RefreshOutlined,
  TableChartOutlined,
} from '@mui/icons-material'
import {
  Button,
  Card,
  CardActionArea,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { bridgeAtom, studentAtom } from '../../../contexts/bridge'
import { modalsAtom } from '../../../contexts/modals'
import { schedulesAtom, schedulesViewAtom } from '../../../contexts/schedules'
import { SettingsGoAction } from '../../settings/Fetch'

export const HomeStatisticsWidget = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const schedules = useAtomValue(schedulesAtom)
  const schedulesView = useAtomValue(schedulesViewAtom)
  const navigate = useNavigate()
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
      <Stack spacing={1.5} sx={{ px: 2.25, py: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          今日课表
        </Typography>
        <Stack spacing={0.5} sx={{ py: 3, alignItems: 'center' }}>
          {schedules ? (
            schedulesView.start ? (
              <Stack></Stack>
            ) : (
              <Fragment>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  设置学期起始后
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  查看今日课程信息
                </Typography>
              </Fragment>
            )
          ) : (
            <Fragment>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                暂无课表数据
              </Typography>
            </Fragment>
          )}
        </Stack>
      </Stack>

      <Divider />

      <CardActionArea onClick={handleFetch} sx={{ pl: 2.25, pr: 2, py: 1.5 }}>
        <Stack
          direction="row"
          spacing={2.5}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            重新获取数据
          </Typography>
          <RefreshOutlined
            sx={{ color: 'text.disabled', width: 20, height: 20 }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  )
}
