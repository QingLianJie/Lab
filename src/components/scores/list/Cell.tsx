import { Link, TableCell, Typography, useTheme } from '@mui/material'
import { blue, indigo } from '@mui/material/colors'
import { Link as RouterLink } from 'react-router-dom'
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

export const BodyCell = ({ column, item }: BodyCellProps) => {
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  return (
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
        color: 'text.primary',
        '&:last-of-type': { pr: 3 },
      }}
    >
      {column.score ? (
        <Typography
          sx={{
            fontWeight: 700,
            color: scoreColor(item['score'].map(s => scoreMap(s))[0]),
          }}
        >
          {item['score']
            .map((s, i) => (s === '---' ? item?.['mark']?.[i] || '' : s))
            .join(' / ')}
        </Typography>
      ) : column.link ? (
        <Link
          component={RouterLink}
          to={`/courses/${item['id']}`}
          sx={{ color: indigo[isDark ? 200 : 500] }}
          onClick={e => e.stopPropagation()}
        >
          {item[column.id]}
        </Link>
      ) : (
        <Typography>{item[column.id]}</Typography>
      )}
    </TableCell>
  )
}
