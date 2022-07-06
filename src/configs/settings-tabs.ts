import {
  AccountCircleOutlined,
  AccountCircleRounded,
  DnsOutlined,
  DnsRounded,
  CodeOutlined,
  CodeRounded,
  ColorLensOutlined,
  ColorLensRounded,
  ExtensionOutlined,
  ExtensionRounded,
  HelpOutlineOutlined,
  HelpRounded,
  InfoOutlined,
  InfoRounded,
  SchoolOutlined,
  SchoolRounded,
  type SvgIconComponent,
  AlternateEmailOutlined,
  AlternateEmailRounded,
} from '@mui/icons-material'
import { type ElementType } from 'react'
import { About } from '../components/settings/tabs/About'
import { Appearance } from '../components/settings/tabs/Appearance'
import { Apps } from '../components/settings/tabs/Apps'
import { Contact } from '../components/settings/tabs/Contact'
import { Developer } from '../components/settings/tabs/Developer'
import { Help } from '../components/settings/tabs/Help'
import { OpenSource } from '../components/settings/tabs/OpenSource'
import { Qing } from '../components/settings/tabs/Qing'
import { University } from '../components/settings/tabs/University'

export type Tabs = {
  name: string
  id: string
  component: ElementType
  icon: SvgIconComponent[]
}[]

export const tabs = [
  {
    name: '清廉街',
    id: 'qing',
    component: Qing,
    icon: [AccountCircleOutlined, AccountCircleRounded],
  },
  {
    name: 'HEU 账号',
    id: 'heu',
    component: University,
    icon: [SchoolOutlined, SchoolRounded],
  },
  {
    name: '外观',
    id: 'appearance',
    component: Appearance,
    icon: [ColorLensOutlined, ColorLensRounded],
  },
  {
    name: '插件',
    id: 'apps',
    component: Apps,
    icon: [ExtensionOutlined, ExtensionRounded],
  },
  {
    name: '联系我们',
    id: 'contact',
    component: Contact,
    icon: [AlternateEmailOutlined, AlternateEmailRounded],
  },
  {
    name: '帮助',
    id: 'help',
    component: Help,
    icon: [HelpOutlineOutlined, HelpRounded],
  },
  {
    name: '开源',
    id: 'open-source',
    component: OpenSource,
    icon: [CodeOutlined, CodeRounded],
  },
  {
    name: '开发者选项',
    id: 'developer',
    component: Developer,
    icon: [DnsOutlined, DnsRounded],
  },
  {
    name: '关于',
    id: 'about',
    component: About,
    icon: [InfoOutlined, InfoRounded],
  },
] as Tabs
