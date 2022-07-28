import { type Bridge } from '@qing-dev/bridge'
import { atom } from 'jotai'
import { type FetcherInfo } from '..'
import { atomLocal } from '../utils/atom'

type Student =
  | false
  | {
      id: string
      password: string
    }

export const studentAtom = atomLocal<Student>('student', false)

export const bridgeAtom = atom<Bridge | false>(false)
export const fetcherAtom = atom<FetcherInfo | false>(false)

type Upload =
  | false
  | {
      id: string
      date: string
    }

export const uploadAtom = atomLocal<Upload>('upload', false)
