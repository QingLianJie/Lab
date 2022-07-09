import { atom } from 'jotai'

type Modals = {
  login: boolean
  bind: boolean
  register: boolean
  reset: boolean
}

export const modalsAtom = atom<Modals>({
  login: false,
  bind: false,
  register: false,
  reset: false,
})
