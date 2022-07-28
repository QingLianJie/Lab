import { TableCell } from '@mui/material'
import { type Score } from '../../..'
import { type ScoreColumn } from '../../../configs/scores/columns'
import { scoreColor, scoreMap } from '../../../utils/calc'

interface HeadCellProps {
  column: ScoreColumn
}

export const HeadCell = ({ column }: HeadCellProps) => (
  <TableCell
    sx={{
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontSize: 'body1.fontSize',
      fontWeight: 700,
      color: 'text.secondary',
      py: 1.5,
      px: { xs: 1, sm: 2 },
      textAlign: column.number ? 'right' : 'left',
      '&:last-of-type': { pr: 3 },
    }}
  >
    {column.header || column.name}
  </TableCell>
)

interface BodyCellProps {
  column: ScoreColumn
  item: Score
}

export const BodyCell = ({ column, item }: BodyCellProps) => (
  <TableCell
    sx={{
      maxWidth: { xs: 200, sm: 240 },
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontSize: 'body1.fontSize',
      py: 1.5,
      px: { xs: 1, sm: 2 },
      textAlign: column.number ? 'right' : 'left',
      fontWeight: column.score || column.bold ? 700 : 500,
      color: column.score
        ? scoreColor(item['score'].map(s => scoreMap(s))[0])
        : 'text.primary',
      '&:last-of-type': { pr: 3 },
    }}
  >
    {column.score
      ? item['score']
          .map((s, i) => (s === '---' ? item?.['mark']?.[i] || '' : s))
          .join(' / ')
      : item[column.id]}
  </TableCell>
)
