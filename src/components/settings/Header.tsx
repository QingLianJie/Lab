import {
  BookmarkBorderOutlined,
  HelpOutlineOutlined,
  type SvgIconComponent,
} from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from '../base/Tooltip'

interface SettingsHeaderProps {
  title: string
  children?: ReactNode
  href?: string
  help?: string
}

export const SettingsHeader = ({
  title,
  href,
  help,
  children,
}: SettingsHeaderProps) => (
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
    {href && (
      <Tooltip title="了解更多" arrow placement="top">
        <IconButton
          aria-label="了解更多"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
        >
          <BookmarkBorderOutlined />
        </IconButton>
      </Tooltip>
    )}

    {help && (
      <Tooltip title="帮助" placement="top">
        <IconButton
          component={Link}
          aria-label="帮助"
          to={help}
          sx={{
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
        >
          <HelpOutlineOutlined />
        </IconButton>
      </Tooltip>
    )}
  </Stack>
)
