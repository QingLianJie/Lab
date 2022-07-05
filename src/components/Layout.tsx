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
        <title>{title ? `${title} - ${info.title}` : info.title}</title>
        <meta name="description" content={description || info.description} />
      </Helmet>
      <Container>
        <Stack
          spacing={1}
          sx={{
            ml: { xs: 0, md: 10 },
            mb: { xs: 9, md: 0 },
            px: 2,
            py: { xs: 4, lg: 6, xl: 8 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: 'h5.fontSize',
              fontWeight: 700,
            }}
          >
            {title || info.title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {subtitle}
            </Typography>
          )}
        </Stack>

        {children}
      </Container>
    </Fragment>
  )
}
