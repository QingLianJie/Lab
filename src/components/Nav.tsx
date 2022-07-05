import { LoginOutlined } from '@mui/icons-material'
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Icon,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { findLast } from 'lodash'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoOutlined from '../assets/logo-outlined.svg'
import { Routers, routers } from '../configs/routers'
import { Tooltip } from './base/Tooltip'

export const Nav = () => {
  const { palette, breakpoints } = useTheme()
  const isDark = palette.mode === 'dark'
  const isMobile = useMediaQuery(breakpoints.down('md'))

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [router, setRouter] = useState<Routers[number] | null>(null)

  useEffect(() => {
    const router = findLast(routers, r => pathname.startsWith(r.href))
    if (!router) navigate(`/404?from=${pathname}`)
    else setRouter(router)
  }, [pathname])

  return (
    <BottomNavigation
      value={router?.name}
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        top: { xs: 'unset', md: 0 },
        right: { xs: 0, md: 'unset' },
        width: { xs: '100%', md: 80 },
        height: { xs: 64, md: '100%' },
        zIndex: 1000,
        flexDirection: { xs: 'row', md: 'column' },
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: { xs: 1, md: 0 },
        borderRightWidth: { xs: 0, md: 1 },
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderColor: 'divider',
        px: { xs: 2, md: 0 },
      }}
    >
      <Avatar
        variant="square"
        alt="清廉街 Logo"
        src={LogoOutlined}
        sx={{
          width: 36,
          height: 36,
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          top: 36,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      {routers
        .filter(r => r.group !== -1)
        .map(r => (
          <Tooltip
            arrow
            title={r.name}
            placement={isMobile ? 'top' : 'right'}
            key={r.name}
          >
            <BottomNavigationAction
              component={Link}
              icon={
                <Icon
                  component={r.icon[r.name === router?.name ? 1 : 0]}
                  sx={{
                    color:
                      r.name === router?.name
                        ? r.color[isDark ? 1 : 0]
                        : 'text.disabled',
                    fontSize: { xs: '1.5rem', md: '1.625rem' },
                    transition: 'color 0.2s',
                  }}
                />
              }
              value={r.name}
              to={r.href}
              sx={{
                minWidth: 'unset',
                width: '100%',
                height: '100%',
                maxWidth: { xs: 72, md: 'unset' },
                maxHeight: { xs: 'unset', md: 72 },
                flex: 1,
                '&:hover': { backgroundColor: 'action.hover' },
                '&:hover svg': { color: r.color[isDark ? 1 : 0] },
                transition: 'background-color 0.2s',
              }}
            />
          </Tooltip>
        ))}
      <Tooltip
        arrow
        title="登录到「清廉街」"
        placement={isMobile ? 'top' : 'right'}
      >
        <Button
          sx={{
            position: 'absolute',
            bottom: 36,
            left: 0,
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            height: 72,
            borderRadius: 'unset',
            '&:hover': { backgroundColor: 'action.hover' },
            transition: 'background-color 0.2s',
          }}
        >
          <LoginOutlined
            sx={{ color: 'text.disabled', fontSize: '1.375rem' }}
          />
        </Button>
      </Tooltip>
    </BottomNavigation>
  )
}
