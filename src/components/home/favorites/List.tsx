import {
  FolderRounded,
  FolderOutlined,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import {
  List,
  ListItemButton,
  ListItemIcon,
  Icon,
  ListItemText,
  Collapse,
  Stack,
  Typography,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { Fragment, useMemo, useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Favorite, favoritesAtom } from '../../../contexts/links'
import { HomeFavoritesLinkItem } from './LinkItem'

export const HomeFavoritesList = () => {
  const favorites = useAtomValue(favoritesAtom)
  const [open, setOpen] = useState<number[]>([])

  const handleOpen = (id: number) => {
    if (open.includes(id)) setOpen(open.filter(item => item !== id))
    else setOpen([...open, id])
  }

  return (
    <List dense sx={{ width: '100%' }}>
      {favorites.map(favorite =>
        'children' in favorite ? (
          <Fragment key={favorite.id}>
            <ListItemButton onClick={() => handleOpen(favorite.id)}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icon
                  component={
                    open.includes(favorite.id) ? FolderRounded : FolderOutlined
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
                <ExpandLess fontSize="small" sx={{ color: 'text.disabled' }} />
              ) : (
                <ExpandMore fontSize="small" sx={{ color: 'text.disabled' }} />
              )}
            </ListItemButton>
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
              sx={{ width: '100%', alignItems: 'center', py: 3 }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                没有收藏的链接
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                点击链接右侧 ⭐ 添加
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
