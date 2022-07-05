import {
  styled,
  tooltipClasses,
  TooltipProps,
  Tooltip as MuiTooltip,
} from '@mui/material'

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
    marginLeft: '-0.6em',
  },
  [`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
    marginBottom: '-0.6em',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: theme.typography.fontSize,
    padding: '0.375rem 0.75rem',
  },
}))
