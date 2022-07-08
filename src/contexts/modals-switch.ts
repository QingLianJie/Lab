import { atom } from 'jotai'

interface Modals {
  login: boolean
  register: boolean
  reset: boolean
  bind: boolean
}
export const modalsAtom = atom<Modals>({
  login: false,
  register: false,
  reset: false,
  bind: false,
})
