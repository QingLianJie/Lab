import {
  Link,
  TableCell,
  TableSortLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { indigo } from '@mui/material/colors'
import { useAtom } from 'jotai'
import { Link as RouterLink } from 'react-router-dom'
import { type Score } from '../../..'
import { type ScoreColumn } from '../../../configs/scores/columns'
import { scoresViewAtom } from '../../../contexts/scores'
import { scoreColor, scoreMap } from '../../../utils/calc'

interface ScoresHeadCellProps {
  column: ScoreColumn
}

export const ScoresHeadCell = ({ column }: ScoresHeadCellProps) => {
  const [scoresView, setScoresView] = useAtom(scoresViewAtom)
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const handleSort = () => {
    if (scoresView.sort.column === column.id)
      setScoresView(view => ({
        ...view,
        sort: {
          order: scoresView.sort.order === 'asc' ? 'desc' : 'asc',
          column: column.id,
        },
      }))
    else
      setScoresView(view => ({
        ...view,
        sort: { order: 'desc', column: column.id },
      }))
  }

  return (
    <TableCell
      sx={{
        width: column.link && isMobile ? column.width * 0.75 : column.width,
        whiteSpace: 'nowrap',
        fontSize: 'body2.fontSize',
        fontWeight: 700,
        color: 'text.secondary',
        py: 1.25,
        px: { xs: 1, sm: 1.25 },
        textAlign: column.number ? 'right' : 'left',
        '&:last-of-type': { pr: 3 },
      }}
    >
      <TableSortLabel
        hideSortIcon={true}
        active={scoresView.sort.column === column.id}
        direction={scoresView.sort.order}
        onClick={handleSort}
        sx={{
          position: 'relative',
          '& svg': {
            position: 'absolute',
            right: -24,
            top: 2,
          },
        }}
      >
        {column.header || column.name}
      </TableSortLabel>
    </TableCell>
  )
}

interface ScoresBodyCellProps {
  column: ScoreColumn
  item: Score
}

export const ScoresBodyCell = ({ column, item }: ScoresBodyCellProps) => {
  const { palette, breakpoints } = useTheme()
  const isDark = palette.mode === 'dark'
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  return (
    <TableCell
      sx={{
        width: column.width,
        maxWidth: column.link && isMobile ? column.width * 0.65 : column.width,
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
            .join('｜')}
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

export const ScoresSpaceCell = () => (
  <TableCell
    sx={{
      width: { xs: 0, md: 'auto' },
      minWidth: 0,
      py: 1.25,
      px: 0,
    }}
  />
)
