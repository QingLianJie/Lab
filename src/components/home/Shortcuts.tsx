import { ExpandMoreOutlined } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  Collapse,
  Divider,
  Grid,
  Icon,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { shortcuts, type Shortcut } from '../../configs/routers'

export const HomeShortcuts = () => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const [open, setOpen] = useState(false)

  const count = shortcuts.pinned.length + shortcuts.others.length

  return (
    <Card variant="outlined">
      <Grid container>
        {shortcuts.pinned.map((item, index) => (
          <ShortcutItem
            shortcut={item}
            key={item.name}
            index={index}
            count={isMobile ? count : shortcuts.pinned.length}
          />
        ))}

        {isMobile ? (
          <Fragment>
            {shortcuts.others.map((item, index) => (
              <ShortcutItem
                shortcut={item}
                key={item.name}
                index={index + shortcuts.pinned.length}
                count={count}
              />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={12}>
              <Divider />
              <CardActionArea
                onClick={() => setOpen(!open)}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 0.25,
                  px: 2,
                }}
              >
                <ExpandMoreOutlined
                  sx={{
                    width: 20,
                    height: 20,
                    color: 'text.disabled',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </CardActionArea>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={open}>
                <Divider />
                <Grid container>
                  {shortcuts.others.map((item, index) => (
                    <ShortcutItem
                      shortcut={item}
                      key={item.name}
                      index={index}
                      count={shortcuts.others.length}
                    />
                  ))}
                </Grid>
              </Collapse>
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Card>
  )
}

interface ShortcutItemProps {
  shortcut: Shortcut
  index: number
  count: number
}

const ShortcutItem = ({ shortcut, index, count }: ShortcutItemProps) => {
  const { palette, breakpoints } = useTheme()
  const isDark = palette.mode === 'dark'
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  return (
    <Grid
      item
      xs={12 / 5}
      sm={6}
      sx={{
        border: 0,
        borderBottomWidth: {
          xs: index >= count - (count % 5 || 5) ? 0 : 1,
          sm: index >= count - (count % 2 || 2) ? 0 : 1,
        },
        borderRightWidth: {
          xs: index % 5 === 4 ? 0 : 1,
          sm: index % 2 === 1 ? 0 : 1,
        },
        borderStyle: 'solid',
        borderColor: 'divider',
      }}
    >
      <CardActionArea
        component={shortcut.external ? 'a' : Link}
        to={shortcut.external ? undefined : shortcut.href}
        href={shortcut.external ? shortcut.href : undefined}
        target={shortcut.external ? '_blank' : undefined}
        rel={shortcut.external ? 'noopener noreferrer' : undefined}
      >
        <Stack
          spacing={{ xs: 1, sm: 0 }}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            position: 'relative',
            px: 2,
            pt: { xs: 2.25, sm: 1.75 },
            pb: { xs: 1.75, sm: 1.75 },
            flex: 1,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Icon
            component={shortcut.icon[0]}
            sx={{
              position: { xs: 'relative', sm: 'absolute' },
              right: { xs: 'unset', sm: 14 },
              top: { xs: 'unset', sm: 14 },
              color: shortcut.color[isDark ? 1 : 0],
              width: 24,
              height: 24,
            }}
          />
          <Stack spacing={{ xs: 0, sm: 0.25 }}>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'nowrap',
                fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' },
                fontWeight: { xs: 500, sm: 700 },
              }}
            >
              {shortcut.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.disabled',
                fontFamily: 'code.fontFamily',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              {shortcut.id}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Grid>
  )
}
