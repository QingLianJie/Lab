import {
  InsertChartOutlined,
  SchoolOutlined,
  SettingsOutlined,
  TableChartOutlined,
} from '@mui/icons-material'
import { amber, blue, green, red } from '@mui/material/colors'

export const storages = [
  {
    id: 'settings',
    name: '网站设置',
    description: '网站的设置选项',
    icon: SettingsOutlined,
    color: [amber[600], amber[500]],
  },
  {
    id: 'student',
    name: 'HEU 账号',
    description: 'HEU 账号和密码',
    icon: SchoolOutlined,
    color: [red[400], red[300]],
  },
  {
    id: 'scores',
    name: '成绩数据',
    description: '获取的成绩数据',
    icon: InsertChartOutlined,
    color: [green[500], green[400]],
  },
  {
    id: 'schedules',
    name: '课表数据',
    description: '获取的课表数据',
    icon: TableChartOutlined,
    color: [blue[500], blue[400]],
  },
]
