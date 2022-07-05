import { LoginOutlined } from '@mui/icons-material'
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Icon,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { findLast } from 'lodash'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoOutlined from '../assets/logo-outlined.svg'
import { Routers, routers } from '../configs/routers'
import { info } from '../configs/site-info'
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
        alt="网站 Logo"
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
      <Stack
        spacing={{ xs: 0, md: 1 }}
        direction={{ xs: 'row', md: 'column' }}
        sx={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
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
                      transition: 'color 0.2s',
                    }}
                  />
                }
                value={r.name}
                to={r.href}
                sx={{
                  minWidth: 'unset',
                  width: { xs: '100%', md: 56 },
                  height: { xs: '100%', md: 56 },
                  maxWidth: { xs: 72, md: 'unset' },
                  maxHeight: { xs: 'unset', md: 56 },
                  borderRadius: { xs: 'unset', md: 2 },
                  flex: 1,
                  '&:hover': {
                    backgroundColor: isMobile ? 'unset' : 'action.hover',
                  },
                  '&:hover svg': { color: r.color[isDark ? 1 : 0] },
                  transition: 'background-color 0.2s',
                }}
              />
            </Tooltip>
          ))}
      </Stack>

      <Tooltip
        arrow
        title={`登录到「${info.title}」`}
        placement={isMobile ? 'top' : 'right'}
      >
        <Button
          sx={{
            position: 'absolute',
            bottom: 36,
            left: '50%',
            display: { xs: 'none', md: 'flex' },
            width: 56,
            height: 56,
            minWidth: 'unset',
            borderRadius: 2,
            transform: 'translateX(-50%)',
            '&:hover': {
              backgroundColor: isMobile ? 'unset' : 'action.hover',
            },
            transition: 'background-color 0.2s',
          }}
        >
          <LoginOutlined sx={{ color: 'text.disabled' }} />
        </Button>
      </Tooltip>
    </BottomNavigation>
  )
}
