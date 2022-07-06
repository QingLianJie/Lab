import { Container, Stack, Typography } from '@mui/material'
import { Fragment, ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { info } from '../configs/site-info'

interface LayoutProps {
  title?: string
  description?: string
  subtitle?: string
  children?: ReactNode
}

export const Layout = ({
  title,
  description,
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
          <Stack spacing={1} sx={{ px: 2, py: { xs: 5, md: 5, lg: 6 } }}>
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
          </Stack>

          {children}

          <Stack
            spacing={1}
            direction="row"
            sx={{
              px: 2,
              py: { xs: 3, md: 4 },
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              清廉街 © 2022
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              color="textSecondary"
              sx={{ textDecoration: 'none' }}
            >
              黑ICP备2021003925号-1
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Fragment>
  )
}
