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
    <Box
      component="nav"
      id="nav-bar"
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        top: { xs: 'unset', md: 0 },
        right: { xs: 0, md: 'unset' },
        zIndex: 1000,
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
      >
        清
      </Avatar>
      <BottomNavigation
        value={router?.name || '主页'}
        showLabels={false}
        sx={{
          width: { xs: '100%', md: 80 },
          height: { xs: 64, md: '100%' },
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
        {routers
          .filter(r => r.group !== -1)
          .map(r => (
            <BottomNavigationAction
              key={r.name}
              component={Link}
              icon={
                <Tooltip
                  arrow
                  title={r.name}
                  placement={isMobile ? 'top' : 'right'}
                >
                  <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center' }}>
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
                  </Box>
                </Tooltip>
              }
              value={r.name}
              showLabel={false}
              to={r.href}
              sx={{
                minWidth: 'unset',
                width: { xs: '100%', md: 48 },
                height: { xs: '100%', md: 48 },
                maxWidth: { xs: 72, md: 'unset' },
                maxHeight: { xs: 'unset', md: 48 },
                my: { xs: 0, md: 1 },
                borderRadius: { xs: 'unset', md: 24 },
                flex: 1,
                '&:hover': {
                  backgroundColor: isMobile ? 'unset' : 'action.hover',
                },
                '&:hover svg': { color: r.color[isDark ? 1 : 0] },
                transition: 'background-color 0.2s',
              }}
            />
          ))}
      </BottomNavigation>

      <Tooltip
        arrow
        title={`登录到${info.name}`}
        placement={isMobile ? 'top' : 'right'}
      >
        <Button
          sx={{
            position: 'absolute',
            bottom: 36,
            left: '50%',
            display: { xs: 'none', md: 'flex' },
            width: 48,
            height: 48,
            minWidth: 'unset',
            borderRadius: 24,
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
    </Box>
  )
}
