import {
  AccountCircleOutlined,
  AccountCircleRounded,
  AlternateEmailOutlined,
  AlternateEmailRounded,
  CodeOutlined,
  CodeRounded,
  SdStorageOutlined,
  SdStorageRounded,
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
  type SvgIconComponent,
} from '@mui/icons-material'
import { type ElementType } from 'react'
import { SettingsAbout } from '../../components/settings/tabs/About'
import { SettingsExtension } from '../../components/settings/tabs/Extension'
import { SettingsDeveloper } from '../../components/settings/tabs/Developer'
import { SettingsContact } from '../../components/settings/tabs/Contact'
import { SettingsHelp } from '../../components/settings/tabs/Help'
import { SettingsOpenSource } from '../../components/settings/tabs/OpenSource'
import { SettingsAccount } from '../../components/settings/tabs/Account'
import { SettingsStorage } from '../../components/settings/tabs/Storage'
import { SettingsBridge } from '../../components/settings/tabs/Bridge'
import { AuthLogin } from '../../components/settings/modals/auth/Login'
import { AuthRegister } from '../../components/settings/modals/auth/Register'
import { AuthResetPassword } from '../../components/settings/modals/auth/ResetPassword'

export type SettingsTabs = {
  name: string
  id: string
  component: ElementType
  icon: SvgIconComponent[]
}[]

export const settingsTabs = [
  {
    name: '清廉街',
    id: 'account',
    component: SettingsAccount,
    icon: [AccountCircleOutlined, AccountCircleRounded],
  },
  {
    name: 'HEU 账号',
    id: 'bridge',
    component: SettingsBridge,
    icon: [SchoolOutlined, SchoolRounded],
  },
  {
    name: '插件',
    id: 'extension',
    component: SettingsExtension,
    icon: [ExtensionOutlined, ExtensionRounded],
  },
  {
    name: '数据',
    id: 'storage',
    component: SettingsStorage,
    icon: [SdStorageOutlined, SdStorageRounded],
  },
  {
    name: '联系我们',
    id: 'contact',
    component: SettingsContact,
    icon: [AlternateEmailOutlined, AlternateEmailRounded],
  },
  {
    name: '帮助',
    id: 'help',
    component: SettingsHelp,
    icon: [HelpOutlineOutlined, HelpRounded],
  },
  {
    name: '开源',
    id: 'open-source',
    component: SettingsOpenSource,
    icon: [CodeOutlined, CodeRounded],
  },
  {
    name: '开发者选项',
    id: 'developer',
    component: SettingsDeveloper,
    icon: [DnsOutlined, DnsRounded],
  },
  {
    name: '关于',
    id: 'about',
    component: SettingsAbout,
    icon: [InfoOutlined, InfoRounded],
  },
] as SettingsTabs

export type AuthTabs = {
  name: string
  component: ElementType
}[]

export const authTabs = [
  {
    name: '登录',
    component: AuthLogin,
  },
  {
    name: '注册',
    component: AuthRegister,
  },
  {
    name: '重置密码',
    component: AuthResetPassword,
  },
] as AuthTabs
