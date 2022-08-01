import { Typography } from '@mui/material'
import { Fragment } from 'react'
import { sections } from '../../../configs/schedules/table'
import { Tooltip } from '../../base/styled/Tooltip'
import { SchedulesBlock } from './Blocks'

export const SchedulesTableSections = () => (
  <Fragment>
    {sections.map(section => (
      <SchedulesBlock key={section.id} border="top" col={1} row={section.row}>
        <Tooltip
          title={`${section.time[0]} - ${section.time[1]}`}
          arrow
          placement="top"
        >
          <Typography
            sx={{
              fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
              fontWeight: 700,
              color: 'text.secondary',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 24,
              height: 24,
              userSelect: 'none',
            }}
          >
            {section.id}
          </Typography>
        </Tooltip>
      </SchedulesBlock>
    ))}

    <SchedulesBlock border="top" col={1} row={17}>
      <Typography
        sx={{
          fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
          fontWeight: 700,
          color: 'text.secondary',
        }}
      >
        #
      </Typography>
    </SchedulesBlock>
  </Fragment>
)
