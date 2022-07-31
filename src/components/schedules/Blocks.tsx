import { Grid, GridProps } from '@mui/material'

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
      minHeight: { xs: 36, sm: 48 },
      overflow: 'hidden',
      ...sx,
    }}
    {...props}
  />
)
