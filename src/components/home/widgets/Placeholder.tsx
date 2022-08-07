import {
  ArrowForwardOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  Divider,
  Icon,
  Stack,
  Typography,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { useAtom, useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { bridgeAtom, studentAtom } from '../../../contexts/bridge'
import { modalsAtom } from '../../../contexts/modals'
import { schedulesAtom } from '../../../contexts/schedules'
import { scoresAtom } from '../../../contexts/scores'

export const HomeWidgetPlaceholder = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const bridge = useAtomValue(bridgeAtom)
  const student = useAtomValue(studentAtom)
  const scores = useAtomValue(scoresAtom)
  const schedules = useAtomValue(schedulesAtom)

  const navigate = useNavigate()

  const handleFetch = () => {
    if (!bridge) navigate('/settings?tab=extension')
    else if (!student) setModals({ ...modals, bind: true })
    else setModals({ ...modals, captcha: true })
  }

  return (
    <Card variant="outlined">
      <Stack divider={<Divider />}>
        <Stack
          spacing={1}
          sx={{ width: '100%', py: 2, px: 2.5, alignItems: 'flex-start' }}
        >
          <TaskItem name="1. 安装插件或 App" checked={!!bridge} />
          <TaskItem name=" 2. 添加 HEU 账号" checked={!!student} />
          <TaskItem
            name="3. 获取成绩和课表数据"
            checked={!!(scores && schedules)}
          />
        </Stack>

        <Stack
          spacing={0.5}
          sx={{ alignItems: 'flex-start', py: 1.5, px: 2.5 }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            新版清廉街修改了数据获取方式，需要安装插件或者下载 App
            后获取成绩和课表数据。
          </Typography>
        </Stack>

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
      </Stack>
    </Card>
  )
}

interface TaskItemProps {
  name: string
  checked: boolean
}

const TaskItem = ({ name, checked }: TaskItemProps) => (
  <Stack
    direction="row"
    sx={{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Typography variant="body1" sx={{ width: '100%', fontWeight: 700 }}>
      {name}
    </Typography>
    <Icon
      component={checked ? CheckOutlined : CloseOutlined}
      sx={{
        mr: -0.5,
        color: checked ? green[400] : 'action.selected',
        width: 20,
        height: 20,
      }}
    />
  </Stack>
)
