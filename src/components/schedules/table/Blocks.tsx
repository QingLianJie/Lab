import {
  ButtonBase,
  Divider,
  Grid,
  Stack,
  type GridProps,
  type StackProps,
} from '@mui/material'
import { ElementType } from 'react'

interface SchedulesBlockProps extends GridProps {
  col: number
  span?: number
  row: number
  border: 'left' | 'top' | 'both'
}

export const SchedulesBlock = ({
  border,
  col,
  row,
  span,
  sx,
  ...props
}: SchedulesBlockProps) => (
  <Grid
    item
    sx={{
      gridColumnStart: col,
      gridRowStart: row,
      gridRowEnd: span ? row + span : undefined,
      borderTop: border === 'top' || border === 'both' ? 1 : 0,
      borderLeft: border === 'left' || border === 'both' ? 1 : 0,
      borderColor: 'divider',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: { xs: 0.5, sm: 1 },
      minHeight: { xs: 36, sm: 46 },
      overflow: 'hidden',
      ...sx,
    }}
    {...props}
  />
)

interface SchedulesBlockActionProps extends StackProps {
  component?: ElementType
}

export const SchedulesBlockAction = ({
  sx,
  ...props
}: SchedulesBlockActionProps) => (
  <Stack
    component={ButtonBase}
    spacing={{ xs: 0.75, sm: 1 }}
    sx={{
      position: 'relative',
      px: { xs: 1, sm: 1.25 },
      py: { xs: 0.75, sm: 1 },
      width: '100%',
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      fontSize: { xs: 'caption.fontSize', sm: 'body2.fontSize' },
      textAlign: 'left',
      borderRadius: 2,
      border: 1,
      borderColor: 'divider',
      overflow: 'hidden',
      '& .MuiTouchRipple-root': { mt: 0 },
      backgroundColor: 'background.subtle',
      '&:hover': { backgroundColor: 'action.hover' },
      transition: 'background-color 0.2s',
      ...sx,
    }}
    divider={<Divider sx={{ borderColor: 'divider', width: '100%' }} />}
    {...props}
  />
)
