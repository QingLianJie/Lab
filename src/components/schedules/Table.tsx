import { TableChartRounded } from '@mui/icons-material'
import {
  ButtonBase,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { days, sections, spaces } from '../../configs/schedules/table'
import {
  schedulesAtom,
  schedulesViewAtom,
} from '../../contexts/bridge/schedules'
import { type TimeTableBlocks } from '../../index.d'
import { SettingsFetch } from '../settings/Fetch'
import { SchedulesBlock } from './Blocks'

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

    console.log([blocks, matrix])

    return [blocks, matrix]
  }, [schedulesView.week, schedules])

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
        {days.map(day => (
          <SchedulesBlock border="left" key={day.name} col={day.col} row={1}>
            <Typography
              sx={{
                fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
                fontWeight: 700,
                color: 'text.secondary',
              }}
            >
              {day.name}
            </Typography>
          </SchedulesBlock>
        ))}

        {sections.map(section => (
          <SchedulesBlock
            key={section.id}
            border="top"
            col={1}
            row={section.row}
          >
            <Typography
              sx={{
                fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
                fontWeight: 700,
                color: 'text.secondary',
              }}
            >
              {section.id}
            </Typography>
          </SchedulesBlock>
        ))}

        {spaces.map(space => (
          <SchedulesBlock
            key={space.name}
            border="top"
            col={1}
            row={space.row}
            sx={{ gridColumnEnd: 9 }}
          >
            <Typography
              sx={{
                fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
                fontWeight: 700,
                color: 'text.secondary',
              }}
            >
              {space.name}
            </Typography>
          </SchedulesBlock>
        ))}

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
            <Stack
              component={ButtonBase}
              spacing={{ xs: 0.75, sm: 1 }}
              sx={{
                px: { xs: 1, sm: 1.5 },
                py: { xs: 0.75, sm: 1.25 },
                width: '100%',
                height: '100%',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
                textAlign: 'left',
                borderRadius: 2,
                backgroundColor: 'action.hover',
                border: 1,
                borderColor: 'divider',
                overflow: 'hidden',
                '& .MuiTouchRipple-root': { mt: 0 },
              }}
              divider={
                <Divider sx={{ borderColor: 'divider', width: '100%' }} />
              }
            >
              <Stack spacing={0.25}>
                <Typography sx={{ fontWeight: 700, fontSize: 'inherit' }}>
                  {block.courses[0].name}
                </Typography>
                <Typography sx={{ fontSize: 'inherit' }}>
                  {block.courses[0].location}
                </Typography>
                <Typography sx={{ fontSize: 'inherit' }}>
                  {block.courses[0].teacher.join(' / ')}
                </Typography>
              </Stack>
              {block.courses.length > 1 && (
                <Stack sx={{ width: '100%' }}>
                  {block.courses.slice(1).map((course, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        width: '100%',
                        fontWeight: 700,
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
            </Stack>
          </SchedulesBlock>
        ))}
      </Grid>
    </Card>
  ) : (
    <Card variant="outlined">
      <SettingsFetch name="课表" icon={TableChartRounded} />
    </Card>
  )
}
