import {
  ArrowBackOutlined,
  BookmarkBorderOutlined,
  HelpOutlineOutlined,
  type SvgIconComponent,
} from '@mui/icons-material'
import {
  Icon,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from '../base/styled/Tooltip'

interface SettingsHeaderProps {
  title: string
  icon: SvgIconComponent
  children?: ReactNode
  href?: string
  help?: string
}

export const SettingsHeader = ({
  icon,
  title,
  href,
  help,
  children,
}: SettingsHeaderProps) => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  return (
    <Stack
      spacing={{ xs: 1, sm: 1.75 }}
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider',
        pl: { xs: 1.5, sm: 2.75 },
        pr: { xs: 1.5, sm: 1.75 },
        py: 1,
      }}
    >
      {isMobile ? (
        <Tooltip title="返回" arrow placement="top">
          <IconButton
            component={Link}
            aria-label="返回"
            to="/settings"
            sx={{
              color: 'text.disabled',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s',
            }}
          >
            <ArrowBackOutlined />
          </IconButton>
        </Tooltip>
      ) : (
        <Icon component={icon} sx={{ color: 'text.disabled' }} />
      )}

      <Typography
        variant="h1"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 700,
          py: 1,
          flex: 1,
        }}
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
        <Tooltip title="帮助" arrow placement="top">
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
}
