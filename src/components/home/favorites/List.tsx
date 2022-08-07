import {
  ExpandLess,
  ExpandMore,
  FolderDeleteOutlined,
  FolderOutlined,
  FolderRounded,
} from '@mui/icons-material'
import {
  Collapse,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useMemo, useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Favorite, favoritesAtom } from '../../../contexts/links'
import { modesAtom } from '../../../contexts/modes'
import { Tooltip } from '../../base/styled/Tooltip'
import { HomeFavoritesLinkItem } from './LinkItem'

export const HomeFavoritesList = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom)
  const [open, setOpen] = useState<number[]>([])
  const modes = useAtomValue(modesAtom)

  const handleOpen = (id: number) => {
    if (open.includes(id)) setOpen(open.filter(item => item !== id))
    else setOpen([...open, id])
  }

  const handleRemove = (name: string, id: number) => {
    const ans = confirm(`确定要删除分组 ${name} 吗？`)
    if (!ans) return
    setFavorites(favorites => favorites.filter(favorite => favorite.id !== id))
  }

  return (
    <List dense sx={{ width: '100%' }}>
      {favorites.map(favorite =>
        'children' in favorite ? (
          <Fragment key={favorite.id}>
            <ListItem
              disablePadding
              secondaryAction={
                modes.favorites && (
                  <Tooltip title="删除这个分组" arrow placement="top">
                    <IconButton
                      aria-label="删除这个分组"
                      edge="end"
                      onClick={() => handleRemove(favorite.name, favorite.id)}
                      sx={{ right: '2.5px' }}
                    >
                      <FolderDeleteOutlined sx={{ color: red[500] }} />
                    </IconButton>
                  </Tooltip>
                )
              }
            >
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
            </ListItem>

            <Collapse in={open.includes(favorite.id)}>
              {favorite.children.map(item => (
                <HomeFavoritesLinkItem key={item.id} favorite={item} />
              ))}
            </Collapse>
          </Fragment>
        ) : (
          <HomeFavoritesLinkItem key={favorite.id} favorite={favorite} />
        )
      )}
    </List>
  )
}

export const HomeFavoritesStarredList = () => {
  const favorites = useAtomValue(favoritesAtom)

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

  return (
    <List dense sx={{ width: '100%' }}>
      <TransitionGroup>
        {starrtedFavorites.length === 0 ? (
          <Collapse>
            <Stack
              spacing={0.5}
              sx={{ width: '100%', alignItems: 'center', py: 4 }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                没有收藏过的链接
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textAlign: 'center' }}
              >
                点击链接右侧的 ⭐ 添加
              </Typography>
            </Stack>
          </Collapse>
        ) : (
          starrtedFavorites.map(favorite => (
            <Collapse key={favorite.name}>
              <HomeFavoritesLinkItem favorite={favorite} />
            </Collapse>
          ))
        )}
      </TransitionGroup>
    </List>
  )
}
