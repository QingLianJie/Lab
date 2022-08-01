import { Typography } from '@mui/material'
import { Fragment } from 'react'
import { spaces } from '../../../configs/schedules/table'
import { SchedulesBlock } from './Blocks'

export const SchedulesTableSpaces = () => (
  <Fragment>
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
  </Fragment>
)
