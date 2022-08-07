import { atom } from 'jotai'

type Modes = {
  favorites: boolean
}

export const modesAtom = atom<Modes>({
  favorites: false,
})
