import { InsertChartRounded } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { groupBy } from 'lodash'
import { Fragment, useEffect } from 'react'
import {
  scoresAtom,
  scoresFilterAtom,
  scoresListAtom,
  scoresViewAtom,
} from '../../contexts/bridge/scores'
import { SettingsFetch } from '../settings/Fetch'
import { ScoresGroup } from './list/Group'
import { ScoresRows, ScoresTitleRow } from './list/Rows'
import { ScoresPlaceholder } from './Placeholder'
import { ScoresToolBar } from './ToolBar'

export const ScoresList = () => {
  const [scoresList, setScoresList] = useAtom(scoresListAtom)

  const scores = useAtomValue(scoresAtom)
  const scoresFilter = useAtomValue(scoresFilterAtom)
  const scoresView = useAtomValue(scoresViewAtom)

  const groupedList =
    scoresView.groups === 'term'
      ? Object.entries(groupBy(scoresList, scoresView.groups)).reverse()
      : Object.entries(groupBy(scoresList, scoresView.groups))

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

  return scores ? (
    <Fragment>
      {scores.scores.length === 0 ? (
        <Card variant="outlined">
          <ScoresPlaceholder
            title="暂无成绩数据"
            description="可能本来就没有成绩，或者程序出错了"
          />
        </Card>
      ) : (
        <Stack spacing={2}>
          <ScoresToolBar />
          <Card variant="outlined">
            <TableContainer>
              <Table
                aria-label="成绩列表"
                sx={{
                  border: 'none',
                  width: 'auto',
                  minWidth: '100%',
                  tableLayout: 'fixed',
                }}
              >
                <TableHead>
                  <ScoresTitleRow />
                </TableHead>

                {scoresList.every(item => item.hidden) ? (
                  <Box component="caption">
                    <ScoresPlaceholder
                      title="暂无成绩数据"
                      description="当前筛选结果下并没有找到成绩"
                    />
                  </Box>
                ) : (
                  <TableBody>
                    {scoresView.groups === 'none' ? (
                      <ScoresRows list={scoresList} />
                    ) : (
                      groupedList.map(([name, scores]) => (
                        <ScoresGroup name={name} scores={scores} key={name} />
                      ))
                    )}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                px: 1.5,
                py: 0.75,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                divider={
                  <Divider orientation="vertical" sx={{ height: 'auto' }} />
                }
                sx={{ px: 1 }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {scoresList.filter(item => !item.hidden).length} 个课程
                </Typography>

                {scoresView.groups !== 'none' && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {groupedList.length} 个分组
                  </Typography>
                )}
              </Stack>
              <Button
                color="success"
                sx={{ py: 0.5 }}
                onClick={() => window.scrollTo(0, 0)}
              >
                回到顶部
              </Button>
            </Stack>
          </Card>
        </Stack>
      )}
    </Fragment>
  ) : (
    <Card variant="outlined">
      <SettingsFetch name="成绩" icon={InsertChartRounded} />
    </Card>
  )
}
