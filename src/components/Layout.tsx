import { type SvgIconComponent } from '@mui/icons-material'
import { Container, Icon, Stack, Typography } from '@mui/material'
import { Fragment, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { info } from '../configs/site-info'

interface LayoutProps {
  title?: string
  description?: string
  icon?: SvgIconComponent
  subtitle?: string
  children?: ReactNode
}

export const Layout = ({
  title,
  description,
  icon,
  subtitle,
  children,
}: LayoutProps) => {
  return (
    <Fragment>
      <Helmet>
        <title>{title ? `${title} - ${info.name}` : info.name}</title>
        <meta name="description" content={description || info.description} />
      </Helmet>
      <Container>
        <Stack
          sx={{
            pl: { xs: 0, md: 10 },
            pb: { xs: 8, md: 0 },
            minHeight: '100vh',
          }}
        >
          <Stack
            spacing={1}
            sx={{ position: 'relative', px: 2, py: { xs: 5, lg: 6 } }}
          >
            <Typography
              variant="h1"
              sx={{ fontSize: 'h5.fontSize', fontWeight: 700 }}
            >
              {title || info.name}
            </Typography>
            {subtitle && (
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {subtitle}
              </Typography>
            )}

            {icon && (
              <Icon
                component={icon}
                sx={{
                  color: 'action.selected',
                  width: 56,
                  height: 56,
                  position: 'absolute',
                  top: { xs: 60, lg: 68 },
                  right: 8,
                  transform: 'translateY(-50%)',
                }}
              />
            )}
          </Stack>

          <Stack sx={{ flex: 1 }}>{children}</Stack>

          <Stack
            spacing={1}
            direction="row"
            sx={{
              px: 2,
              py: { xs: 3, md: 4 },
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {info.name} © {new Date().getFullYear()}
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              color="textSecondary"
              sx={{ textDecoration: 'none', lineHeight: 1.5 }}
            >
              {info.icp}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Fragment>
  )
}
