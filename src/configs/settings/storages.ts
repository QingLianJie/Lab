import { InsertChartOutlined, SchoolOutlined, SettingsOutlined, TableChartOutlined } from '@mui/icons-material'
import { bridgeAtom, schedulesAtom, scoresAtom } from '../../contexts/bridge'
import { settingsAtom } from '../../contexts/settings'

export const storages = [
  {
    id: 'settings',
    name: '网站设置',
    description: '网站的设置选项',
    atom: settingsAtom,
    icon: SettingsOutlined,
  },
  {
    id: 'bridge',
    name: 'HEU 账号',
    description: 'HEU 账号和密码',
    atom: bridgeAtom,
    icon: SchoolOutlined,
  },
  {
    id: 'scores',
    name: '成绩数据',
    description: '获取的成绩数据',
    atom: scoresAtom,
    icon: InsertChartOutlined,
  },
  {
    id: 'schedules',
    name: '课表数据',
    description: '获取的课表数据',
    atom: schedulesAtom,
    icon: TableChartOutlined,
  },
]
