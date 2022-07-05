import {
  BugReportOutlined,
  BugReportRounded,
  ClassOutlined,
  ClassRounded,
  EightMp,
  InboxOutlined,
  InboxRounded,
  InsertChartOutlined,
  InsertChartRounded,
  SettingsOutlined,
  SettingsRounded,
  TableChartOutlined,
  TableChartRounded,
  type SvgIconComponent,
} from '@mui/icons-material'
import { amber, blue, green, pink, red } from '@mui/material/colors'
import { type ElementType } from 'react'
import { HomePage } from '../routers'
import { NotFoundPage } from '../routers/404'
import { CoursesPage } from '../routers/courses'
import { CoursePage } from '../routers/courses/[id]'
import { SchedulesPage } from '../routers/schedules'
import { ScoresPage } from '../routers/scores'
import { SettingsPage } from '../routers/settings'

export type RouterName = '主页' | '课程' | '成绩' | '课表' | '设置'

export type Routers = {
  name: RouterName
  href: string
  component: ElementType
  icon: SvgIconComponent[]
  children?: { name: string; href: string; component: ElementType }[]
  color: string[]
  group: number
}[]

export const routers = [
  {
    name: '主页',
    href: '/',
    component: HomePage,
    icon: [InboxOutlined, InboxRounded],
    color: [pink[400], pink[300]],
    group: 0,
  },
  {
    name: '课程',
    href: '/courses',
    component: CoursesPage,
    icon: [ClassOutlined, ClassRounded],
    children: [
      {
        name: '课程详情',
        href: '/courses/:id',
        component: CoursePage,
      },
    ],
    color: [red[500], red[400]],
    group: 0,
  },
  {
    name: '成绩',
    href: '/scores',
    component: ScoresPage,
    icon: [InsertChartOutlined, InsertChartRounded],
    color: [green[500], green[400]],
    group: 0,
  },
  {
    name: '课表',
    href: '/schedules',
    component: SchedulesPage,
    icon: [TableChartOutlined, TableChartRounded],
    color: [blue[500], blue[400]],
    group: 0,
  },
  {
    name: '设置',
    href: '/settings',
    component: SettingsPage,
    icon: [SettingsOutlined, SettingsRounded],
    color: [amber[600], amber[500]],
    group: 1,
  },
  {
    name: '找不到页面',
    href: '/404',
    component: NotFoundPage,
    icon: [BugReportOutlined, BugReportRounded],
    color: [pink[400], pink[300]],
    group: -1,
  },
] as Routers
