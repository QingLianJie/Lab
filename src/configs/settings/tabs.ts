import {
  AccountCircleOutlined,
  AccountCircleRounded,
  AlternateEmailOutlined,
  AlternateEmailRounded,
  ArrowBackOutlined,
  ArrowBackRounded,
  DataObjectOutlined,
  DataObjectRounded,
  DnsOutlined,
  DnsRounded,
  ExtensionOutlined,
  ExtensionRounded,
  HelpOutlineOutlined,
  HelpRounded,
  InfoOutlined,
  InfoRounded,
  SchoolOutlined,
  SchoolRounded,
  SdStorageOutlined,
  SdStorageRounded,
  type SvgIconComponent,
} from '@mui/icons-material'
import { Box } from '@mui/material'
import { type ElementType } from 'react'
import { SettingsAbout } from '../../components/settings/tabs/About'
import { SettingsAccount } from '../../components/settings/tabs/Account'
import { SettingsBridge } from '../../components/settings/tabs/Bridge'
import { SettingsContact } from '../../components/settings/tabs/Contact'
import { SettingsDeveloper } from '../../components/settings/tabs/Developer'
import { SettingsExtension } from '../../components/settings/tabs/Extension'
import { SettingsHelp } from '../../components/settings/tabs/Help'
import { SettingsOpenSource } from '../../components/settings/tabs/OpenSource'
import { SettingsStorage } from '../../components/settings/tabs/Storage'

export type SettingsTabs = {
  name: string
  description: string
  short: string
  id: string
  component: ElementType
  icon: SvgIconComponent[]
  dashboard?: boolean
}[]

export const settingsTabs = [
  {
    name: '返回设置',
    description: '设置功能列表',
    short: '返回',
    id: 'dashboard',
    component: Box,
    icon: [ArrowBackOutlined, ArrowBackRounded],
  },
  {
    name: '清廉街账号',
    description: '登录、注册和找回密码',
    short: '清廉街账号',
    id: 'account',
    component: SettingsAccount,
    icon: [AccountCircleOutlined, AccountCircleRounded],
    dashboard: true,
  },
  {
    name: 'HEU 账号',
    description: '学校账号的绑定与解绑',
    short: 'HEU 账号',
    id: 'bridge',
    component: SettingsBridge,
    icon: [SchoolOutlined, SchoolRounded],
    dashboard: true,
  },
  {
    name: '插件与 App',
    description: '检测或安装插件和 App',
    short: '插件',
    id: 'extension',
    component: SettingsExtension,
    icon: [ExtensionOutlined, ExtensionRounded],
    dashboard: true,
  },
  {
    name: '数据管理',
    description: '管理浏览器中的数据',
    short: '数据',
    id: 'storage',
    component: SettingsStorage,
    icon: [SdStorageOutlined, SdStorageRounded],
    dashboard: true,
  },
  {
    name: '联系我们',
    description: '几种联系和反馈方式',
    short: '联系我们',
    id: 'contact',
    component: SettingsContact,
    icon: [AlternateEmailOutlined, AlternateEmailRounded],
    dashboard: true,
  },
  {
    name: '常见问题',
    description: '一些网站的常见问题',
    short: '帮助',
    id: 'help',
    component: SettingsHelp,
    icon: [HelpOutlineOutlined, HelpRounded],
    dashboard: true,
  },
  {
    name: '开源与致谢',
    description: '项目的开源协议与致谢',
    short: '开源',
    id: 'open-source',
    component: SettingsOpenSource,
    icon: [DataObjectOutlined, DataObjectRounded],
    dashboard: true,
  },
  {
    name: '开发者选项',
    description: '开发调试相关设置',
    short: '开发者选项',
    id: 'developer',
    component: SettingsDeveloper,
    icon: [DnsOutlined, DnsRounded],
    dashboard: true,
  },
  {
    name: '关于清廉街',
    description: '一个普通的关于页面',
    short: '关于',
    id: 'about',
    component: SettingsAbout,
    icon: [InfoOutlined, InfoRounded],
    dashboard: true,
  },
] as SettingsTabs
