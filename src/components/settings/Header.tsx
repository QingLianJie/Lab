import { type SvgIconComponent } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { type ReactNode } from 'react'

interface SettingsHeaderProps {
  title: string
  children?: ReactNode
}

export const SettingsHeader = ({ title, children }: SettingsHeaderProps) => (
  <Stack
    spacing={2}
    direction="row"
    sx={{
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: 1,
      borderColor: 'divider',
      pl: { xs: 2.5, md: 3 },
      pr: { xs: 1.5, md: 2 },
      py: 1,
    }}
  >
    <Typography
      variant="h1"
      sx={{ fontSize: '1.125rem', fontWeight: 700, py: 1.5 }}
    >
      {title}
    </Typography>
    {children}
  </Stack>
)
