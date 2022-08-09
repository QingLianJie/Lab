import { atom } from 'jotai'
import { SummaryRemarkCourse, type SummaryCourse } from '..'

export type AuthModal = false | '登录' | '注册' | '重置密码'

type Modals = {
  auth: AuthModal
  captcha: boolean
  bind: boolean
  scores: {
    filter: boolean
  }
  schedules: {
    details: false | SummaryCourse[] | SummaryRemarkCourse[]
    calendar: boolean
  }
  thanks: boolean
}

export const modalsAtom = atom<Modals>({
  auth: false,
  captcha: false,
  bind: false,
  scores: { filter: false },
  schedules: { details: false, calendar: false },
  thanks: false,
})
