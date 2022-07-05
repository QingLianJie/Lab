import { Container } from '@mui/material'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

interface LayoutProps {
  title?: string
  children?: ReactNode
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Container>
      <Helmet>
        <title>{title ? `${title} - 清廉街` : '清廉街'}</title>
      </Helmet>
      {children}
    </Container>
  )
}
