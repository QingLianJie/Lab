import { atomLocal } from './atom'

interface Developer {
  css: string
  api: string
}

export const develpoerAtom = atomLocal<Developer>('settings', {
  css: '',
  api: '',
})
