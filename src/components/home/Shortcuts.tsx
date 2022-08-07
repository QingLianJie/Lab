import { ExpandMoreOutlined } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  Collapse,
  Divider,
  Icon,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { shortcuts, type Shortcut } from '../../configs/routers'

export const HomeShortcuts = () => {
  const [open, setOpen] = useState(false)

  return (
    <Card variant="outlined">
      <Stack>
        {shortcuts.pinned.map((row, index) => (
          <Fragment key={index}>
            <Stack
              direction="row"
              divider={
                <Divider orientation="vertical" sx={{ height: 'auto' }} />
              }
              sx={{ width: '100%', flex: 1 }}
            >
              {row.map(item => (
                <ShortcutItem shortcut={item} key={item.name} />
              ))}
            </Stack>
            <Divider orientation="horizontal" sx={{ height: 'auto' }} />
          </Fragment>
        ))}
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
        <Collapse in={open}>
          {shortcuts.others.map((row, index) => (
            <Fragment key={index}>
              <Divider orientation="horizontal" sx={{ height: 'auto' }} />
              <Stack
                direction="row"
                divider={
                  <Divider orientation="vertical" sx={{ height: 'auto' }} />
                }
                sx={{ width: '100%', flex: 1 }}
              >
                {row.map(item => (
                  <ShortcutItem shortcut={item} key={item.name} />
                ))}
              </Stack>
            </Fragment>
          ))}
        </Collapse>
      </Stack>
    </Card>
  )
}

interface ShortcutItemProps {
  shortcut: Shortcut
}

const ShortcutItem = ({ shortcut }: ShortcutItemProps) => {
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  return (
    <CardActionArea component={Link} to={shortcut.href}>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          position: 'relative',
          px: 2,
          py: 1.75,
          flex: 1,
          width: '100%',
        }}
      >
        <Stack spacing={0.25}>
          <Typography
            variant="body1"
            sx={{ whiteSpace: 'nowrap', fontWeight: 700 }}
          >
            {shortcut.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.disabled',
              fontFamily: 'code.fontFamily',
            }}
          >
            {shortcut.id}
          </Typography>
        </Stack>
        <Icon
          component={shortcut.icon[0]}
          sx={{
            position: 'absolute',
            right: { xs: 16, sm: 14 },
            top: { xs: 16, sm: 14 },
            color: shortcut.color[isDark ? 1 : 0],
            width: 24,
            height: 24,
          }}
        />
      </Stack>
    </CardActionArea>
  )
}
