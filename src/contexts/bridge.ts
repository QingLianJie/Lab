import { atomLocal } from './atom'

type Bridge =
  | false
  | {
      id: string
      password: string
    }

export const bridgeAtom = atomLocal<Bridge>('bridge', false)

export const scoresAtom = atomLocal('scores', false)
export const schedulesAtom = atomLocal('schedules', false)
