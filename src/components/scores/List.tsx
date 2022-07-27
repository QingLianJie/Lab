import { InsertChartRounded } from '@mui/icons-material'
import {
  Box,
  Card,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { columns } from '../../configs/scores/columns'
import {
  scoresAtom,
  scoresFilterAtom,
  scoresListAtom,
  scoresViewAtom,
} from '../../contexts/bridge/scores'
import { scoreColor, scoreMap } from '../../utils/calc'
import { Fetch } from '../settings/Fetch'
import { Placeholder } from './Placeholder'
import { ToolBar } from './ToolBar'

export const List = () => {
  const [scoresList, setScoresList] = useAtom(scoresListAtom)

  const scores = useAtomValue(scoresAtom)
  const scoresFilter = useAtomValue(scoresFilterAtom)
  const scoresView = useAtomValue(scoresViewAtom)

  useEffect(() => {
    if (!scores) return

    if (
      !scoresFilter.search &&
      scoresFilter.filter.credit.length === 0 &&
      scoresFilter.filter.period.length === 0 &&
      !scoresFilter.filter.nature &&
      !scoresFilter.filter.category &&
      !scoresFilter.filter.type
    ) {
      setScoresList(list =>
        list.map(item => {
          item.hidden = false
          return item
        })
      )
      return
    }

    setScoresList(list =>
      list.map(item => {
        const search =
          scoresFilter.search &&
          !Object.values(item)
            .join(' ')
            .replace(/true|false|null/g, '')
            .trim()
            .toLocaleLowerCase()
            .includes(scoresFilter.search)

        const type =
          scoresFilter.filter.type && item.type !== scoresFilter.filter.type

        const credit =
          scoresFilter.filter.credit.length !== 0 &&
          !scoresFilter.filter.credit.includes(item.credit)

        const period =
          scoresFilter.filter.period.length !== 0 &&
          !scoresFilter.filter.period.includes(item.period)

        const nature =
          scoresFilter.filter.nature &&
          item.nature !== scoresFilter.filter.nature

        const category =
          scoresFilter.filter.category &&
          item.category !== scoresFilter.filter.category

        item.hidden = Boolean(
          search || type || credit || period || nature || category
        )

        return item
      })
    )
  }, [scoresFilter])

  return (
    <Card variant="outlined">
      {scores ? (
        <Fragment>
          {scores.scores.length === 0 ? (
            <Placeholder
              title="暂无成绩数据"
              description="可能本来就没有成绩，或者程序出错了"
            />
          ) : (
            <Fragment>
              <ToolBar />
              <Divider />
              <TableContainer>
                <Table aria-label="成绩列表">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ py: 1.5, pr: 0.5, width: 12 }}>
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
                  {scoresList.every(item => item.hidden) && (
                    <Box component="caption">
                      <Placeholder
                        title="暂无成绩数据"
                        description="当前筛选结果下并没有找到成绩"
                      />
                    </Box>
                  )}
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
