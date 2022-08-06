import {
  AddOutlined,
  ExpandLess,
  ExpandMore,
  FolderOutlined,
  FolderRounded,
  PublicOutlined,
  StarOutlineRounded,
  StarRounded,
  VpnLockOutlined,
} from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  Collapse,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material'
import { amber } from '@mui/material/colors'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { favoritesAtom, type Favorite } from '../../contexts/links'
import { Tooltip } from '../base/styled/Tooltip'

export const HomeFavorites = () => {
  const favorites = useAtomValue(favoritesAtom)
  const [open, setOpen] = useState<number[]>([])

  useEffect(() => {
    console.log('1', favorites)
  }, [favorites])

  const starrtedFavorites = useMemo(() => {
    console.log(favorites)

    return favorites.reduce((pre, cur) => {
      if ('children' in cur) {
        pre.push(...cur.children.filter(item => item.star))
        return pre
      } else {
        if (cur.star) pre.push(cur)
        return pre
      }
    }, [] as Favorite[])
  }, [favorites])

  const handleOpen = (id: number) => {
    if (open.includes(id)) setOpen(open.filter(item => item !== id))
    else setOpen([...open, id])
  }

  return (
    <Card variant="outlined">
      <Stack divider={<Divider />}>
        <List dense sx={{ width: '100%' }}>
          <TransitionGroup>
            {starrtedFavorites.length === 0 ? (
              <Collapse>
                <Stack sx={{ width: '100%', alignItems: 'center', py: 2 }}>
                  <Typography sx={{ color: 'text.disabled' }}>
                    没有收藏的链接
                  </Typography>
                </Stack>
              </Collapse>
            ) : (
              starrtedFavorites.map(favorite => (
                <Collapse key={favorite.name}>
                  <LinkItem favorite={favorite} />
                </Collapse>
              ))
            )}
          </TransitionGroup>
        </List>

        <List dense sx={{ width: '100%' }}>
          {favorites.map(favorite =>
            'children' in favorite ? (
              <Fragment key={favorite.id}>
                <ListItemButton onClick={() => handleOpen(favorite.id)}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Icon
                      component={
                        open.includes(favorite.id)
                          ? FolderRounded
                          : FolderOutlined
                      }
                      fontSize="small"
                      sx={{ color: 'text.disabled' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={favorite.name}
                    sx={{
                      '& span': {
                        fontSize: 'body1.fontSize',
                        fontWeight: open.includes(favorite.id) ? 700 : 500,
                      },
                    }}
                  />
                  {open.includes(favorite.id) ? (
                    <ExpandLess
                      fontSize="small"
                      sx={{ color: 'text.disabled' }}
                    />
                  ) : (
                    <ExpandMore
                      fontSize="small"
                      sx={{ color: 'text.disabled' }}
                    />
                  )}
                </ListItemButton>
                <Collapse in={open.includes(favorite.id)}>
                  {favorite.children.map(item => (
                    <LinkItem key={item.id} favorite={item} />
                  ))}
                </Collapse>
              </Fragment>
            ) : (
              <LinkItem key={favorite.id} favorite={favorite} />
            )
          )}
        </List>
      </Stack>
      <Divider />
      <CardActionArea>
        <Stack
          spacing={1.5}
          direction="row"
          sx={{ px: 2, py: 1.5, alignItems: 'center' }}
        >
          <AddOutlined fontSize="small" sx={{ color: 'text.disabled' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            添加自定义链接
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  )
}

interface LinkItemProps {
  favorite: Favorite
}

export const LinkItem = ({ favorite }: LinkItemProps) => {
  const [favorites, setFavorites] = useAtom(favoritesAtom)

  const handleStar = () => {
    setFavorites(favorites =>
      favorites.map(group => {
        if ('children' in group) {
          return {
            ...group,
            children: group.children.map(item => {
              if (item.id === favorite.id) return { ...item, star: !item.star }
              return item
            }),
          }
        } else {
          if (group.id === favorite.id) return { ...group, star: !group.star }
          return group
        }
      })
    )
  }

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          aria-label="收藏链接"
          edge="end"
          onClick={handleStar}
          sx={{ right: '2.5px' }}
        >
          <Tooltip
            title={favorite.star ? '取消收藏' : '收藏'}
            arrow
            placement="top"
          >
            <Icon
              component={favorite.star ? StarRounded : StarOutlineRounded}
              sx={{ color: amber[500] }}
            />
          </Tooltip>
        </IconButton>
      }
    >
      <ListItemButton
        component="a"
        href={favorite.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon sx={{ minWidth: 32 }}>
          {favorite.lan ? (
            <Tooltip title="需要校园网" placement="top">
              <VpnLockOutlined
                fontSize="small"
                sx={{ color: 'text.disabled' }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="可校外访问" placement="top">
              <PublicOutlined
                fontSize="small"
                sx={{ color: 'text.disabled' }}
              />
            </Tooltip>
          )}
        </ListItemIcon>
        <ListItemText
          primary={favorite.name}
          sx={{
            '& span': {
              fontSize: 'body1.fontSize',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
