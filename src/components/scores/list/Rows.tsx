import { Checkbox, TableCell, TableRow } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { columns } from '../../../configs/scores/columns'
import {
  scoresListAtom,
  scoresViewAtom,
  type ScoresList,
} from '../../../contexts/bridge/scores'
import { BodyCell, HeadCell, SpaceCell } from './Cell'

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
                {index === filteredColumns.length - 1 && <SpaceCell />}
                <BodyCell column={column} item={item} />
              </Fragment>
            ))}
          </TableRow>
        ))}
    </Fragment>
  )
}

export const TitleRow = () => {
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
          {index === filteredColumns.length - 1 && <SpaceCell />}
          <HeadCell column={column} />
        </Fragment>
      ))}
    </TableRow>
  )
}
