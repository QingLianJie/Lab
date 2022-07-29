import { ExpandMoreOutlined } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  Collapse,
  Icon,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useState } from 'react'
import { groups } from '../../../configs/scores/groups'
import { studentAtom } from '../../../contexts/bridge'
import {
  scoresListAtom,
  scoresViewAtom,
  type ScoresList,
} from '../../../contexts/bridge/scores'
import { scoreMap, termName } from '../../../utils/calc'
import { ScoresRows } from './Rows'

interface ScoresGroupProps {
  name: string
  scores: ScoresList
}

export const ScoresGroup = ({ name, scores }: ScoresGroupProps) => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))

  const student = useAtomValue(studentAtom)
  const scoresView = useAtomValue(scoresViewAtom)
  const ids = scores.map(item => item.id)
  const [scoresList, setScoresList] = useAtom(scoresListAtom)

  const [open, setOpen] = useState(false)

  const nothing = scores.every(item => item.hidden)
  const every = scores.filter(item => !item.hidden).every(item => item.selected)
  const some = scores.filter(item => !item.hidden).some(item => item.selected)

  const calcAverage = () => {
    const filter = scores.filter(item => !item.hidden)
    const credits = filter.reduce((pre, cur) => pre + cur.credit, 0)
    if (credits === 0) return 0
    return (
      filter.reduce((pre, cur) => {
        const best = Math.max(...cur.score.map(s => scoreMap(s)))
        return pre + cur.credit * best
      }, 0) / credits
    ).toFixed(2)
  }

  const handleSelect = () => {
    setScoresList(list =>
      list.map(item => {
        if (ids.includes(item.id) && !item.hidden) item.selected = !some
        return item
      })
    )
  }

  return (
    <Fragment>
      <TableRow
        sx={{
          '&:hover': { backgroundColor: 'action.hover' },
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <TableCell sx={{ py: 1.5, pr: 0, width: 48, minWidth: 48 }} colSpan={1}>
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
        <TableCell
          sx={{ py: 1.5, px: 1.25 }}
          colSpan={scoresView.columns.length + 1}
          onClick={() => setOpen(v => !v)}
        >
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', minWidth: 32 }}
              >
                {groups.find(group => group.id === scoresView.groups)?.name}
              </Typography>
              <Typography sx={{ fontWeight: 700, minWidth: 182 }}>
                {scoresView.groups === 'term' && student
                  ? ` ${termName(
                      // 这个地方逻辑不严谨，不能从学号获取入学年份，
                      // 因为没法适配研究生的学号，之后需要改
                      parseInt(student.id.slice(0, 4)),
                      name
                    )} / ${name}`
                  : name}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              {!isMobile && (
                <Fragment>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', minWidth: 72 }}
                  >
                    均分 {calcAverage()}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', minWidth: 20 }}
                  >
                    {scores.filter(item => !item.hidden).length}
                  </Typography>
                </Fragment>
              )}
              <Box
                sx={{
                  minWidth: 32,
                  pr: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Icon
                  component={ExpandMoreOutlined}
                  aria-label="展开或折叠成绩分组"
                  sx={{
                    color: 'text.disabled',
                    transform: open ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{ p: 0, border: 'none', width: 'auto' }}
          colSpan={scoresView.columns.length + 2}
        >
          <Collapse in={open}>
            <Table
              sx={{
                border: 'none',
                width: 'auto',
                minWidth: '100%',
                tableLayout: 'fixed',
              }}
            >
              <TableBody>
                <ScoresRows list={scores} />
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}
