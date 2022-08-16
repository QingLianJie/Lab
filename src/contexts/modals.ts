import { atom } from 'jotai'
import { type SummaryRemarkCourse, type SummaryCourse } from '../index.d'

export type AuthModal = false | '登录' | '注册' | '重置密码'

type Modals = {
  auth: AuthModal
  captcha: boolean
  bind: boolean
  courses: { filter: boolean }
  scores: { filter: boolean }
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
  courses: { filter: false },
  scores: { filter: false },
  schedules: { details: false, calendar: false },
  thanks: false,
})
