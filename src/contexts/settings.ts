import { atom } from 'jotai'
import { atomLocal } from '../utils/atom'

type Settings = {
  developer: {
    css: string
    api: string
  }
}

export const defaultSettings = {
  developer: { css: '', api: '' },
}

export const settingsAtom = atomLocal<Settings>('settings', defaultSettings)

type Account =
  | false
  | {
      id: number
      avatar: string
      name: string
      email: string
    }

export const accountAtom = atom<Account>(false)
