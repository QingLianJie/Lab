import { atom } from 'jotai'
import { ColumnsType } from '../../configs/scores/columns'
import { GroupsType } from '../../configs/scores/groups'
import { Score, Scores, ScoresAtom } from '../../index.d'
import { atomLocal } from '../../utils/atom'

export const scoresAtom = atomLocal<ScoresAtom | false>('scores', false)

type ScoresFilter = Partial<Score> & {
  search: string
}

export const scoresFilterAtom = atom<ScoresFilter>({
  search: '',
})

type ScoresView = {
  groups: GroupsType
  columns: ColumnsType[]
  simple: boolean
  sort: {
    column: ColumnsType
    order: 'asc' | 'desc'
  }
}

export const scoresViewAtom = atomLocal<ScoresView>('scores-view', {
  groups: 'term',
  columns: ['name', 'type', 'credit', 'nature', 'score'],
  simple: false,
  sort: { column: 'term', order: 'desc' },
})

type ScoresList = (Score & {
  selected?: boolean
  hidden?: boolean
})[]

export const scoresListAtom = atom<ScoresList>([])
