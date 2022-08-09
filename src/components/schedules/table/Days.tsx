import { Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { Fragment, useCallback } from 'react'
import { days } from '../../../configs/schedules/table'
import { schedulesViewAtom } from '../../../contexts/schedules'
import { SchedulesBlock } from './Blocks'

export const SchedulesTableDays = () => {
  const schedulesView = useAtomValue(schedulesViewAtom)

  const getDate = useCallback(
    (day: number) =>
      dayjs(schedulesView.start).add(
        (schedulesView.week - 1) * 7 + day - 2,
        'day'
      ),
    [schedulesView]
  )

  return (
    <Fragment>
      {days.map(day => (
        <SchedulesBlock border="left" key={day.name} col={day.col} row={1}>
          <Stack
            spacing={{ xs: 0, md: 1 }}
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              alignItems: 'center',
              color: dayjs().isSame(getDate(day.col), 'day')
                ? 'text.primary'
                : 'text.secondary',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
                fontWeight: 700,
                color: 'inherit',
              }}
            >
              {day.name}
            </Typography>

            {schedulesView.start && (
              <Typography
                sx={{
                  fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
                  fontWeight: 700,
                  color: 'inherit',
                }}
              >
                {dayjs().isSame(getDate(day.col), 'day')
                  ? '今天'
                  : getDate(day.col).format('MM-DD')}
              </Typography>
            )}
          </Stack>
        </SchedulesBlock>
      ))}
    </Fragment>
  )
}
