import { TableChartRounded } from '@mui/icons-material'
import {
  Card,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useAtomValue, useAtom } from 'jotai'
import { Fragment } from 'react'
import {
  schedulesAtom,
  schedulesViewAtom,
} from '../../contexts/bridge/schedules'
import { SettingsFetch } from '../settings/Fetch'

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const sections = [
  '第一大节',
  '第一大节',
  '第二大节',
  '第二大节',
  '第二大节',
  '第三大节',
  '第三大节',
  '第四大节',
  '第四大节',
  '第四大节',
  '第五大节',
  '第五大节',
  '第五大节',
]

export const SchedulesTable = () => {
  const schedules = useAtomValue(schedulesAtom)
  const [schedulesView, setSchedulesView] = useAtom(schedulesViewAtom)
  const currentSchedule = schedules
    ? schedules.timetable.weeks[schedulesView.week - 1]
    : false

  return schedules ? (
    <Card variant="outlined">
      {currentSchedule ? (
        <Grid
          container
          sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' }}
        >
          <Grid item>第 {schedulesView.week} 周</Grid>
          {days.map((day, index) => (
            <Grid item key={index}>
              {day}
            </Grid>
          ))}
          {sections.map((section, index) => (
            <Grid item key={index} sx={{ gridColumnStart: 1 }}>
              {section}
            </Grid>
          ))}

          {currentSchedule.rows.map((row, i) => (
            <Fragment key={i}>
              {row.cols.map((col, j) => (
                <Grid
                  item
                  key={j}
                  sx={{ gridColumnStart: j + 2, gridRowStart: i + 2 }}
                >
                  <Stack divider={<Divider />}>
                    {col.courses.map((course, index) => (
                      <Stack key={index}>
                        <Typography>{course.name}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
      ) : (
        <SchedulesPlaceholder
          title="暂无课表数据"
          description="可能是周数出错，或者没有获取到数据"
        />
      )}
    </Card>
  ) : (
    <Card variant="outlined">
      <SettingsFetch name="课表" icon={TableChartRounded} />
    </Card>
  )
}

interface SchedulesPlaceholderProps {
  title: string
  description: string
}

const SchedulesPlaceholder = ({
  title,
  description,
}: SchedulesPlaceholderProps) => (
  <Stack
    spacing={0.5}
    sx={{
      flex: 1,
      width: '100%',
      height: '100%',
      px: 4,
      py: { xs: 8, sm: 18 },
      alignItems: 'center',
    }}
  >
    <Typography
      variant="h6"
      component="span"
      sx={{
        color: 'text.disabled',
        textAlign: 'center',
        fontWeight: 700,
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      component="span"
      sx={{ color: 'text.disabled', textAlign: 'center' }}
    >
      {description}
    </Typography>
  </Stack>
)
