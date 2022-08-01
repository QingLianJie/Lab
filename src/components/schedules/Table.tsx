import { TableChartRounded } from '@mui/icons-material'
import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { colors } from '../../configs/schedules/colors'
import { days, sections } from '../../configs/schedules/table'
import {
  schedulesAtom,
  schedulesViewAtom,
} from '../../contexts/bridge/schedules'
import { type TimeTableBlocks } from '../../index.d'
import { SettingsFetch } from '../settings/Fetch'
import { SchedulesBlock, SchedulesBlockAction } from './table/Blocks'
import { SchedulesTableDays } from './table/Days'
import { SchedulesTableSections } from './table/Sections'
import { SchedulesTableSpaces } from './table/Spaces'

export const SchedulesTable = () => {
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'
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
      <Grid
        container
        sx={{
          width: { xs: '135%', sm: '100%' },
          display: 'grid',
          gridTemplateColumns: {
            xs: '2rem repeat(7, 1fr)',
            sm: '3rem repeat(7, 1fr)',
          },
        }}
      >
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
            <SchedulesBlockAction>
              <Stack
                spacing={0.25}
                sx={{ width: '100%', flex: 1, position: 'relative' }}
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
                    right: 0,
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
    </Card>
  ) : (
    <Card variant="outlined">
      <SettingsFetch name="课表" icon={TableChartRounded} />
    </Card>
  )
}
