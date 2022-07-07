import { atom } from 'jotai'
import { atomLocal } from './atom'

type Developer = {
  css: string
  api: string
}

export const develpoerAtom = atomLocal<Developer>('settings', {
  css: '',
  api: '',
})
