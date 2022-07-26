import { FilterAltOutlined, InsertChartRounded } from '@mui/icons-material'
import {
  Card,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useEffect } from 'react'
import { columns, ColumnsType } from '../../configs/scores/columns'
import { modalsAtom } from '../../contexts/booleans'
import {
  scoresAtom,
  scoresFilterAtom,
  scoresListAtom,
  scoresViewAtom,
} from '../../contexts/bridge/scores'
import { scoreColor, scoreMap } from '../../utils/calc'
import { Tooltip } from '../base/Tooltip'
import { Fetch } from '../settings/Fetch'
import { NoScores } from './Placeholder'
import { Columns } from './toolbar/Columns'
import { Export } from './toolbar/Export'
import { Groups } from './toolbar/Groups'
import { Search } from './toolbar/Search'

export const List = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const scores = useAtomValue(scoresAtom)
  const [scoresList, setScoreList] = useAtom(scoresListAtom)

  const scoresFilter = useAtomValue(scoresFilterAtom)
  const scoresView = useAtomValue(scoresViewAtom)

  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const handleFilter = () =>
    setModals({
      ...modals,
      scores: { ...modals.scores, filter: true },
    })

  useEffect(() => {
    if (!scores) return
    if (!scoresFilter.search) {
      const result = scoresList.map(score => ({ ...score, hidden: false }))
      setScoreList(result)
      return
    }
    const result = scoresList.map(score => {
      if (!JSON.stringify(score).includes(scoresFilter.search))
        return { ...score, hidden: true }
      return { ...score, hidden: false }
    })
    setScoreList(result)
  }, [scoresFilter])

  return (
    <Card variant="outlined">
      {scores ? (
        <Fragment>
          {scores.scores.length === 0 ? (
            <NoScores />
          ) : (
            <Fragment>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  px: { xs: 1, md: 1.5 },
                  py: 0.75,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Search />
                <Stack spacing={0.5} direction="row">
                  <Groups />
                  <Columns />

                  {!isMobile && (
                    <Tooltip title="筛选" arrow placement="top">
                      <IconButton
                        aria-label="筛选"
                        sx={{
                          color: 'text.disabled',
                          '&:hover': { color: 'text.primary' },
                          transition: 'all 0.2s',
                        }}
                        onClick={handleFilter}
                      >
                        <FilterAltOutlined />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Export />
                </Stack>
              </Stack>
              <Divider />
              <TableContainer>
                <Table aria-label="成绩列表">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ py: 1.5 }}>
                        <Checkbox
                          sx={{
                            m: -1,
                            color: 'text.disabled',
                            '&:hover': { color: 'primary' },
                            transition: 'all 0.2s',
                          }}
                        />
                      </TableCell>
                      {columns
                        .filter(column =>
                          scoresView.columns.includes(column.id)
                        )
                        .map(column => (
                          <TableCell
                            key={column.id}
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
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scoresList
                      .filter(item => !item.hidden)
                      .map(item => (
                        <TableRow key={item.id}>
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
                            .filter(column =>
                              scoresView.columns.includes(column.id)
                            )
                            .map(column => (
                              <TableCell
                                key={column.id}
                                sx={{
                                  maxWidth: { xs: 200, sm: 240 },
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  fontSize: 'body1.fontSize',
                                  py: 1.5,
                                  px: { xs: 1, sm: 2 },
                                  textAlign: column.number ? 'right' : 'left',
                                  fontWeight:
                                    column.score || column.bold ? 700 : 500,
                                  color: column.score
                                    ? scoreColor(
                                        item['score'].map(s => scoreMap(s))[0]
                                      )
                                    : 'text.primary',
                                  '&:last-of-type': { pr: 3 },
                                }}
                              >
                                {column.score
                                  ? item['score']
                                      .map((s, i) =>
                                        s === '---'
                                          ? item?.['mark']?.[i] || ''
                                          : s
                                      )
                                      .join(' / ')
                                  : item[column.id]}
                              </TableCell>
                            ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fetch name="成绩" icon={InsertChartRounded} />
      )}
    </Card>
  )
}
