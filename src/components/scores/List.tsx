import { InsertChartRounded } from '@mui/icons-material'
import {
  Card,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useEffect } from 'react'
import { columns } from '../../configs/scores/columns'
import {
  scoresAtom,
  scoresFilterAtom,
  scoresListAtom,
  scoresViewAtom,
} from '../../contexts/bridge/scores'
import { scoreColor, scoreMap } from '../../utils/calc'
import { Fetch } from '../settings/Fetch'
import { NoScores } from './Placeholder'
import { ToolBar } from './toolbar/ToolBar'

export const List = () => {
  const [scoresList, setScoreList] = useAtom(scoresListAtom)
  const scores = useAtomValue(scoresAtom)
  const scoresFilter = useAtomValue(scoresFilterAtom)
  const scoresView = useAtomValue(scoresViewAtom)

  useEffect(() => {
    if (!scores) return
    if (!scoresFilter.search) {
      const result = scoresList.map(score => ({ ...score, hidden: false }))
      setScoreList(result)
      return
    }
    const result = scoresList.map(score => {
      const target = Object.values(score)
        .join(' ')
        .replace(/true|false|null/g, '')
        .trim()
        .toLocaleLowerCase()
      console.log(target)

      if (!target.includes(scoresFilter.search))
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
              <ToolBar />
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
