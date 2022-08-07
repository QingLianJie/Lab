import {
  ArrowForwardOutlined,
  LockOutlined,
  type SvgIconComponent,
} from '@mui/icons-material'
import {
  Button,
  Card,
  CardActionArea,
  Divider,
  Icon,
  Stack,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { modalsAtom } from '../../../contexts/modals'
import { bridgeAtom, studentAtom } from '../../../contexts/bridge'
import { SettingsGoAction } from '../../settings/Fetch'
import { useNavigate } from 'react-router-dom'

export const HomeWidgetPlaceholder = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const bridge = useAtomValue(bridgeAtom)
  const student = useAtomValue(studentAtom)
  const navigate = useNavigate()

  const handleFetch = () => {
    if (!bridge) navigate('/settings?tab=extension')
    else if (!student) setModals({ ...modals, bind: true })
    else setModals({ ...modals, captcha: true })
  }

  return (
    <Card variant="outlined">
      <Stack
        spacing={1}
        sx={{
          position: 'relative',
          flex: 1,
          height: '100%',
          py: 2,
          px: 2.5,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Stack spacing={0.5} sx={{ width: '100%' }}>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            1. 安装插件或 App
            <Typography component="span" sx={{ float: 'right' }}>
              {bridge ? '✅' : ''}
            </Typography>
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            2. 添加 HEU 账号{' '}
            <Typography component="span" sx={{ float: 'right' }}>
              {student ? '✅' : ''}
            </Typography>
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            3. 获取成绩和课表数据
          </Typography>
        </Stack>

        <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            新版清廉街修改了数据获取方式，需要安装插件或者下载 App
            后获取成绩和课表数据。
          </Typography>
        </Stack>
      </Stack>

      <Divider />
      <CardActionArea onClick={handleFetch} sx={{ pl: 2.5, pr: 2, py: 1.5 }}>
        <Stack
          direction="row"
          spacing={2.5}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {!bridge
              ? '安装插件或 App'
              : !student
              ? '添加 HEU 账号'
              : '获取成绩和课表数据'}
          </Typography>
          <ArrowForwardOutlined
            sx={{ color: 'text.disabled', width: 20, height: 20 }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  )
}
