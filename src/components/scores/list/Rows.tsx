import { Checkbox, TableCell, TableRow } from '@mui/material'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { columns } from '../../../configs/scores/columns'
import {
  scoresViewAtom,
  type ScoresList,
} from '../../../contexts/bridge/scores'
import { BodyCell } from './Cell'

interface ScoresRowsProps {
  list: ScoresList
}

export const ScoresRows = ({ list }: ScoresRowsProps) => {
  const scoresView = useAtomValue(scoresViewAtom)

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
          >
            <TableCell sx={{ py: 1.5 }}>
              <Checkbox
                sx={{
                  m: -1,
                  color: 'text.disabled',
                  '&:hover': { color: 'primary' },
                  transition: 'all 0.2s',
                }}
                checked={item.selected}
              />
            </TableCell>
            {columns
              .filter(column => scoresView.columns.includes(column.id))
              .map(column => (
                <BodyCell column={column} item={item} key={column.id} />
              ))}
          </TableRow>
        ))}
    </Fragment>
  )
}
