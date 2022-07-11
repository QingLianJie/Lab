import { type Bridge } from '@qing-dev/bridge'
import { atom } from 'jotai'
import { type FetcherInfo } from '../index.d'
import { atomLocal } from './atom'

type Student =
  | false
  | {
      id: string
      password: string
    }

export const studentAtom = atomLocal<Student>('student', false)

export const bridgeAtom = atom<Bridge | false>(false)
export const fetcherAtom = atom<FetcherInfo | false>(false)

export const scoresAtom = atomLocal('scores', false)
export const schedulesAtom = atomLocal('schedules', false)
