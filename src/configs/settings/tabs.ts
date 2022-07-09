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
import { About } from '../../components/settings/tabs/About'
import { Extension } from '../../components/settings/tabs/Extension'
import { Developer } from '../../components/settings/tabs/Developer'
import { Contact } from '../../components/settings/tabs/Contact'
import { Help } from '../../components/settings/tabs/Help'
import { OpenSource } from '../../components/settings/tabs/OpenSource'
import { Account } from '../../components/settings/tabs/Account'
import { Storage } from '../../components/settings/tabs/Storage'
import { Bridge } from '../../components/settings/tabs/Bridge'

export type Tabs = {
  name: string
  id: string
  component: ElementType
  icon: SvgIconComponent[]
}[]

export const tabs = [
  {
    name: '清廉街',
    id: 'account',
    component: Account,
    icon: [AccountCircleOutlined, AccountCircleRounded],
  },
  {
    name: 'HEU 账号',
    id: 'bridge',
    component: Bridge,
    icon: [SchoolOutlined, SchoolRounded],
  },
  {
    name: '插件',
    id: 'extension',
    component: Extension,
    icon: [ExtensionOutlined, ExtensionRounded],
  },
  {
    name: '数据',
    id: 'storage',
    component: Storage,
    icon: [SdStorageOutlined, SdStorageRounded],
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
