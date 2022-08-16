import {
  ArrowForwardOutlined,
  CategoryOutlined,
  DownloadingOutlined,
  CheckOutlined,
  CloseOutlined,
  HelpOutlineOutlined,
  SchoolOutlined,
  type SvgIconComponent,
} from '@mui/icons-material'
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { Tooltip } from '../../base/styled/Tooltip'

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
    <Card variant="outlined" sx={{ position: 'relative' }}>
      <Stack divider={<Divider />}>
        <Stack
          sx={{ width: '100%', py: 2, px: 2.25, alignItems: 'flex-start' }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              pb: 1.5,
            }}
          >
            成绩和课表
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            新版清廉街修改了数据获取方式，需要安装插件或者下载 App
            后，在本地获取成绩和课表数据。
          </Typography>
        </Stack>

        <List dense sx={{ py: 1.5 }}>
          <TaskItem
            name="安装插件或 App"
            checked={!!bridge}
            icon={CategoryOutlined}
            onClick={() => navigate('/settings?tab=extension')}
          />
          <TaskItem
            name="添加 HEU 账号"
            checked={!!student}
            icon={SchoolOutlined}
            onClick={() => setModals({ ...modals, bind: true })}
          />
          <TaskItem
            name="获取成绩和课表数据"
            checked={!!(scores && schedules)}
            icon={DownloadingOutlined}
            onClick={() => setModals({ ...modals, captcha: true })}
          />
        </List>

        <CardActionArea onClick={handleFetch} sx={{ pl: 2.25, pr: 2, py: 1.5 }}>
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

      <Tooltip title="了解更多" arrow placement="top">
        <IconButton
          aria-label="了解更多"
          sx={{
            position: 'absolute',
            right: 6,
            top: 6,
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
        >
          <HelpOutlineOutlined sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Tooltip>
    </Card>
  )
}

interface TaskItemProps {
  icon: SvgIconComponent
  name: string
  checked: boolean
  onClick: () => void
}

const TaskItem = ({ name, checked, icon, onClick }: TaskItemProps) => (
  <ListItem
    disablePadding
    secondaryAction={
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon
          component={checked ? CheckOutlined : CloseOutlined}
          fontSize="small"
          sx={{ color: checked ? green[400] : 'text.disabled' }}
        />
      </Box>
    }
  >
    <ListItemButton onClick={onClick}>
      <ListItemIcon sx={{ minWidth: 32 }}>
        <Icon
          component={icon}
          fontSize="small"
          sx={{ color: checked ? green[400] : 'text.disabled' }}
        />
      </ListItemIcon>
      <ListItemText
        primary={name}
        sx={{
          my: 0.25,
          flex: 1,
          '& span': {
            color: 'text.primary',
            fontSize: 'body1.fontSize',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
      />
    </ListItemButton>
  </ListItem>
)
