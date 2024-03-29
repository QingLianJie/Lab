import { TableChartRounded } from '@mui/icons-material'
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import { useAtom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { colors } from '../../configs/schedules/colors'
import { days, sections } from '../../configs/schedules/table'
import { modalsAtom } from '../../contexts/modals'
import { schedulesAtom, schedulesViewAtom } from '../../contexts/schedules'
import { type TimeTableBlocks } from '../../index.d'
import { SettingsFetch } from '../settings/Fetch'
import { SchedulesBlock, SchedulesBlockAction } from './table/Blocks'
import { SchedulesTableDays } from './table/Days'
import { SchedulesTableSections } from './table/Sections'
import { SchedulesTableSpaces } from './table/Spaces'

export const SchedulesTable = () => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const [modals, setModals] = useAtom(modalsAtom)
  const schedules = useAtomValue(schedulesAtom)
  const schedulesView = useAtomValue(schedulesViewAtom)

  const [blocks, matrix] = useMemo(() => {
    if (!schedules) return [[], []]
    const currentSchedules = schedules.timetable.courses.main.filter(course =>
      course.week.includes(schedulesView.week)
    )

    const blocks: TimeTableBlocks = []
    const matrix: number[][] = new Array(sections.length + 3)
      .fill(0)
      .map((_, i) => [
        1,
        ...new Array(days.length).fill([0, 6, 12].includes(i) ? 1 : 0),
      ])

    currentSchedules.forEach(course => {
      const row = Math.min(...course.section)
      course.section.forEach(
        (s, i) => (matrix[s + (s >= 11 ? 2 : s >= 6 ? 1 : 0)][course.day] = 1)
      )
      const index = blocks.findIndex(
        block =>
          block.col === course.day &&
          block.row === row + (row >= 11 ? 2 : row >= 6 ? 1 : 0)
      )
      if (index !== -1) {
        blocks[index].span = Math.max(blocks[index].span, course.section.length)
        blocks[index].courses.push(course)
      } else {
        blocks.push({
          row: row + (row >= 11 ? 2 : row >= 6 ? 1 : 0),
          span: course.section.length,
          col: course.day,
          courses: [course],
        })
      }
    })

    return [blocks, matrix]
  }, [schedulesView.week, schedules])

  const getColor = (name: string) =>
    schedules
      ? colors.find(
          color =>
            color.name ===
            schedules?.colors?.find(course => course.name === name)?.color
        )?.color || lightBlue
      : lightBlue

  return schedules ? (
    <Card variant="outlined" sx={{ overflow: 'auto' }}>
      <Stack
        id="timetable"
        sx={{
          borderRadius: 1,
          backgroundColor: 'inherit',
          width: '100%',
          minWidth: '480px',
        }}
      >
        <Grid
          container
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: {
              xs: '2rem repeat(7, 1fr)',
              sm: '3rem repeat(7, 1fr)',
            },
          }}
        >
          <SchedulesBlock border="none" col={1} row={1}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {schedulesView.week}
            </Typography>
          </SchedulesBlock>

          <SchedulesTableDays />
          <SchedulesTableSections />
          <SchedulesTableSpaces />

          {matrix.map((row, i) =>
            row.map(
              (col, j) =>
                col === 0 && (
                  <SchedulesBlock
                    key={`${i}-${j}`}
                    border="both"
                    col={j + 1}
                    row={i + 1}
                    span={col}
                  />
                )
            )
          )}

          {blocks.map(block => (
            <SchedulesBlock
              key={`${block.row}-${block.col}`}
              border="both"
              col={block.col + 1}
              row={block.row + 1}
              span={block.span}
              sx={{ p: 0.5 }}
            >
              <SchedulesBlockAction
                onClick={() =>
                  setModals({
                    ...modals,
                    schedules: { ...modals.schedules, details: block.courses },
                  })
                }
              >
                <Stack
                  spacing={0.25}
                  sx={{
                    width: '100%',
                    flex: 1,
                    position: 'relative',
                    pb: { xs: 2.5, sm: 0 },
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>
                    {block.courses[0].name}
                  </Typography>
                  <Typography sx={{ fontSize: 'inherit' }}>
                    {block.courses[0].location}
                  </Typography>
                  <Typography sx={{ fontSize: 'inherit' }}>
                    {block.courses[0].teacher.join('｜')}
                  </Typography>

                  <Box
                    sx={{
                      position: 'absolute',
                      right: { xs: 'unset', sm: 0 },
                      left: { xs: 0, sm: 'unset' },
                      bottom: 2,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: getColor(block.courses[0].name)[400],
                    }}
                  />
                </Stack>

                {block.courses.length > 1 && (
                  <Stack sx={{ width: '100%' }}>
                    {block.courses.slice(1).map((course, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          width: '100%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: {
                            xs: 'caption.fontSize',
                            sm: 'body2.fontSize',
                          },
                        }}
                      >
                        + {course.name}
                      </Typography>
                    ))}
                  </Stack>
                )}
              </SchedulesBlockAction>
            </SchedulesBlock>
          ))}

          <SchedulesBlock
            border="both"
            col={2}
            row={17}
            sx={{ p: 0.5, gridColumnEnd: 9, justifyContent: 'flex-start' }}
          >
            <Stack direction="row" spacing={0.5}>
              {schedules.timetable.courses.remark
                .filter(course => course.week.includes(schedulesView.week))
                .map(course => (
                  <SchedulesBlockAction
                    key={course.name}
                    sx={{ width: 'fit-content' }}
                    onClick={() =>
                      setModals({
                        ...modals,
                        schedules: { ...modals.schedules, details: [course] },
                      })
                    }
                  >
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{ alignItems: 'center' }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>
                        {course.name}
                      </Typography>

                      <Typography sx={{ fontSize: 'inherit' }}>
                        {course.teacher.join('｜')}
                      </Typography>

                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: getColor(course.name)[400],
                        }}
                      />
                    </Stack>
                  </SchedulesBlockAction>
                ))}
            </Stack>
          </SchedulesBlock>
        </Grid>
      </Stack>
    </Card>
  ) : (
    <Card
      variant="outlined"
      sx={{ flex: 1, display: 'flex', alignItems: 'center' }}
    >
      <SettingsFetch name="课表" icon={TableChartRounded} />
    </Card>
  )
}
