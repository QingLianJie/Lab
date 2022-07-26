import { atom } from 'jotai'
import { ColumnsType } from '../../configs/scores/columns'
import { GroupsType } from '../../configs/scores/groups'
import { Score, Scores, ScoresAtom } from '../../index.d'
import { atomLocal } from '../../utils/atom'

export const scoresAtom = atomLocal<ScoresAtom | false>('scores', false)

type ScoresFilter = Partial<Score> & {
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

type ScoresView = {
  groups: GroupsType
  columns: ColumnsType[]
}

export const scoresViewAtom = atomLocal<ScoresView>('scores-view', {
  groups: 'term',
  columns: [
    'id',
    'name',
    'term',
    'type',
    'credit',
    'period',
    'nature',
    'score',
  ],
})

type ScoresList = (Score & {
  selected?: boolean
  hidden?: boolean
})[]

export const scoresListAtom = atom<ScoresList>([])
