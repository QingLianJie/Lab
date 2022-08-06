import { Checkbox, TableCell, TableRow } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { columns } from '../../../configs/scores/columns'
import {
  scoresListAtom,
  scoresViewAtom,
  type ScoresList,
} from '../../../contexts/scores'
import { scoreMap } from '../../../utils/calc'
import { ScoresBodyCell, ScoresHeadCell, ScoresSpaceCell } from './Cell'

interface ScoresRowsProps {
  list: ScoresList
}

export const ScoresRows = ({ list }: ScoresRowsProps) => {
  const scoresView = useAtomValue(scoresViewAtom)
  const [scoresList, setScoresList] = useAtom(scoresListAtom)
  const filteredColumns = columns.filter(column =>
    scoresView.columns.includes(column.id)
  )

  const handleSelect = (id: string) => {
    setScoresList(list =>
      list.map(item => {
        if (item.id !== id || item.hidden) return item
        item.selected = !item.selected
        return item
      })
    )
  }

  return (
    <Fragment>
      {list
        .filter(item => !item.hidden)
        .sort((a, b) => {
          if (scoresView.sort.column === 'score') {
            const x = Math.max(...a.score.map(s => scoreMap(s)))
            const y = Math.max(...b.score.map(s => scoreMap(s)))
            return scoresView.sort.order === 'asc' ? x - y : y - x
          }
          const x = a[scoresView.sort.column] || 0
          const y = b[scoresView.sort.column] || 0
          if (scoresView.sort.order === 'asc') return x > y ? 1 : -1
          return y > x ? 1 : -1
        })
        .map(item => (
          <TableRow
            key={item.id}
            sx={{
              '&:hover': { backgroundColor: 'action.hover' },
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => handleSelect(item.id)}
          >
            <TableCell sx={{ py: 1.5, pr: 0, width: 48, minWidth: 48 }}>
              <Checkbox
                sx={{
                  m: -1,
                  color: 'text.disabled',
                  '&:hover': { color: 'primary' },
                  transition: 'all 0.2s',
                }}
                checked={!!item.selected}
              />
            </TableCell>
            {filteredColumns.map((column, index) => (
              <Fragment key={column.id}>
                {index === filteredColumns.length - 1 && <ScoresSpaceCell />}
                <ScoresBodyCell column={column} item={item} />
              </Fragment>
            ))}
          </TableRow>
        ))}
    </Fragment>
  )
}

export const ScoresTitleRow = () => {
  const [scoresList, setScoresList] = useAtom(scoresListAtom)
  const scoresView = useAtomValue(scoresViewAtom)
  const filteredColumns = columns.filter(column =>
    scoresView.columns.includes(column.id)
  )

  const nothing = scoresList.every(item => item.hidden)
  const some = scoresList
    .filter(item => !item.hidden)
    .some(item => item.selected)
  const every = scoresList
    .filter(item => !item.hidden)
    .every(item => item.selected)

  const handleSelect = () => {
    setScoresList(list =>
      list.map(item => {
        if (!item.hidden) item.selected = !some
        return item
      })
    )
  }

  return (
    <TableRow>
      <TableCell sx={{ py: 1.5, pr: 0, width: 48, minWidth: 48 }}>
        <Checkbox
          sx={{
            m: -1,
            color: 'text.disabled',
            '&:hover': { color: 'primary' },
            transition: 'all 0.2s',
          }}
          checked={!nothing && every}
          indeterminate={!every && some}
          onChange={handleSelect}
        />
      </TableCell>
      {filteredColumns.map((column, index) => (
        <Fragment key={column.id}>
          {index === filteredColumns.length - 1 && <ScoresSpaceCell />}
          <ScoresHeadCell column={column} />
        </Fragment>
      ))}
    </TableRow>
  )
}
