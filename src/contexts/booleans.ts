import { atom } from 'jotai'

export type AuthModal = false | '登录' | '注册' | '重置密码'

type Modals = {
  auth: AuthModal
  captcha: boolean
  bind: boolean
  scores: {
    filter: boolean
  }
}

export const modalsAtom = atom<Modals>({
  auth: false,
  captcha: false,
  bind: false,
  scores: { filter: false },
})
