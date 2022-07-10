import { atom } from 'jotai'

export type AuthModal = false | '登录' | '注册' | '重置密码'

type Modals = {
  auth: AuthModal
  bind: boolean
}

export const modalsAtom = atom<Modals>({
  auth: false,
  bind: false,
})
