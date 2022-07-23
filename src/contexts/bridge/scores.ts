import { atom } from 'jotai'
import { Score, Scores, ScoresAtom } from '../../index.d'
import { atomLocal } from '../../utils/atom'

export const scoresAtom = atomLocal<ScoresAtom | false>('scores', false)

type ScoresFilter = Partial<ScoresAtom> & {
  search: string
  excellent: boolean
  failed: boolean
  deduplication: boolean
}

export const scoresFilterAtom = atom<ScoresFilter>({
  search: '',
  excellent: false,
  failed: false,
  deduplication: false,
})

export const scoresListAtom = atom<Scores>([])
