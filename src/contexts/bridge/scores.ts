import { atom } from 'jotai'
import { ScoresAtom } from '../../index.d'
import { atomLocal } from '../../utils/atom'

export const scoresAtom = atomLocal<ScoresAtom | false>('scores', false)

type ScoresFilter = Partial<ScoresAtom> & {
  excellent?: boolean
  failed?: boolean
  deduplication?: boolean
}

export const scoresFilterAtom = atom<ScoresFilter>({})
