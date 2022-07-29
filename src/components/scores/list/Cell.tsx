import {
  Link,
  TableCell,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { blue, indigo } from '@mui/material/colors'
import { Link as RouterLink } from 'react-router-dom'
import { type Score } from '../../..'
import { type ScoreColumn } from '../../../configs/scores/columns'
import { scoreColor, scoreMap } from '../../../utils/calc'

interface HeadCellProps {
  column: ScoreColumn
}

export const HeadCell = ({ column }: HeadCellProps) => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  return (
    <TableCell
      sx={{
        width: column.link && isMobile ? column.width * 0.75 : column.width,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: 'body1.fontSize',
        fontWeight: 700,
        color: 'text.secondary',
        py: 1.25,
        px: { xs: 1, sm: 1.25 },
        textAlign: column.number ? 'right' : 'left',
        '&:last-of-type': { pr: 3 },
      }}
    >
      {column.header || column.name}
    </TableCell>
  )
}

interface BodyCellProps {
  column: ScoreColumn
  item: Score
}

export const BodyCell = ({ column, item }: BodyCellProps) => {
  const { palette, breakpoints } = useTheme()
  const isDark = palette.mode === 'dark'
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  return (
    <TableCell
      sx={{
        width: column.width,
        maxWidth: column.link && isMobile ? column.width * 0.75 : 'unset',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: column.score ? 'visible' : 'hidden',
        fontSize: 'body1.fontSize',
        py: 1.25,
        px: { xs: 1, sm: 1.25 },
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
            float: column.score ? 'right' : 'unset',
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
          title={item[column.id]?.toString()}
        >
          {item[column.id]}
        </Link>
      ) : (
        <Typography
          title={item[column.id]?.toString()}
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {item[column.id]}
        </Typography>
      )}
    </TableCell>
  )
}

export const SpaceCell = () => (
  <TableCell
    sx={{
      width: { xs: 0, md: 'auto' },
      minWidth: 0,
      py: 1.25,
      px: 0,
    }}
  />
)
