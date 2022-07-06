import { type SvgIconComponent } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { type ReactNode } from 'react'

interface SettingsHeaderProps {
  title: string
  children?: ReactNode
}

export const SettingsHeader = ({ title, children }: SettingsHeaderProps) => (
  <Stack
    component="article"
    spacing={2}
    direction="row"
    sx={{
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: 1,
      borderColor: 'divider',
      px: { xs: 2.5, md: 3 },
      py: 2.5,
    }}
  >
    <Typography variant="h1" sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
      {title}
    </Typography>
    {children}
  </Stack>
)
