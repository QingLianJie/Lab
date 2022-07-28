import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { type ScoreColumnKey } from '../../configs/scores/columns'
import { type GroupsType } from '../../configs/scores/groups'
import { type Score, type ScoresAtom } from '../../index.d'
import { atomLocal } from '../../utils/atom'

export const scoresAtom = atomLocal<ScoresAtom | false>('scores', false)

type ScoresFilter = {
  search: string
  filter: {
    credit: number[]
    period: number[]
    nature: string
    category: string
    type: string
  }
}

export const scoresFilterAtom = atomWithReset<ScoresFilter>({
  search: '',
  filter: {
    credit: [],
    period: [],
    nature: '',
    category: '',
    type: '',
  },
})

type ScoresView = {
  groups: GroupsType
  columns: ScoreColumnKey[]
  simple: boolean
  sort: {
    column: ScoreColumnKey
    order: 'asc' | 'desc'
  }
}

export const scoresViewAtom = atomLocal<ScoresView>('scores-view', {
  groups: 'term',
  columns: ['name', 'type', 'credit', 'nature', 'score'],
  simple: false,
  sort: { column: 'term', order: 'desc' },
})

export type ScoresList = (Score & {
  selected?: boolean
  hidden?: boolean
})[]

export const scoresListAtom = atom<ScoresList>([])
