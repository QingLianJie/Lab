import { Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { days } from '../../../configs/schedules/table'
import { schedulesViewAtom } from '../../../contexts/bridge/schedules'
import { SchedulesBlock } from './Blocks'

export const SchedulesTableDays = () => {
  const schedulesView = useAtomValue(schedulesViewAtom)

  return (
    <Fragment>
      {days.map(day => (
        <SchedulesBlock border="left" key={day.name} col={day.col} row={1}>
          <Stack
            spacing={{ xs: 0, md: 1 }}
            direction={{ xs: 'column', md: 'row' }}
            sx={{ alignItems: 'center' }}
          >
            <Typography
              sx={{
                fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
                fontWeight: 700,
                color: 'text.secondary',
              }}
            >
              {day.name}
            </Typography>

            {schedulesView.start && (
              <Typography
                sx={{
                  fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
                  fontWeight: 700,
                  color: 'text.secondary',
                }}
              >
                {dayjs(schedulesView.start)
                  .add((schedulesView.week - 1) * 7 + day.col - 2, 'day')
                  .format('MM-DD')}
              </Typography>
            )}
          </Stack>
        </SchedulesBlock>
      ))}
    </Fragment>
  )
}
