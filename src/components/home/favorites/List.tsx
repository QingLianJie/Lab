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
      <TransitionGroup>
        {favorites.map(favorite =>
          'children' in favorite ? (
            <Collapse key={favorite.id}>
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
                        <FolderDeleteOutlined
                          sx={{ color: red[500], width: 22, height: 22 }}
                        />
                      </IconButton>
                    </Tooltip>
                  )
                }
                sx={{
                  backgroundColor: open.includes(favorite.id)
                    ? 'background.subtle'
                    : 'background.paper',
                }}
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
                    primary={`${favorite.name} (${favorite.children.length})`}
                    sx={{
                      py: open.includes(favorite.id) ? 0.25 : 0,
                      transition: 'padding 0.2s',
                      '& span': {
                        fontSize: 'body1.fontSize',
                        whiteSpace: 'nowrap',
                        fontWeight: open.includes(favorite.id) ? 700 : 500,
                        fontVariantNumeric: 'tabular-nums',
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
                <TransitionGroup>
                  {favorite.children.map(item => (
                    <Collapse key={item.id}>
                      <HomeFavoritesLinkItem favorite={item} />
                    </Collapse>
                  ))}
                </TransitionGroup>
              </Collapse>
            </Collapse>
          ) : (
            <HomeFavoritesLinkItem key={favorite.id} favorite={favorite} />
          )
        )}
      </TransitionGroup>
    </List>
  )
}

interface HomeFavoritesStarredListProps {
  list: Favorite[]
}

export const HomeFavoritesStarredList = ({
  list,
}: HomeFavoritesStarredListProps) => {
  return (
    <List dense sx={{ width: '100%' }}>
      <TransitionGroup>
        {list.length === 0 ? (
          <Collapse>
            <Stack
              spacing={0.5}
              sx={{
                width: '100%',
                alignItems: 'center',
                py: 4,
              }}
            >
              <Typography variant="body1" sx={{ color: 'text.disabled' }}>
                没有收藏的链接
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.disabled', textAlign: 'center' }}
              >
                点击 ⭐ 添加到收藏
              </Typography>
            </Stack>
          </Collapse>
        ) : (
          list.map(favorite => (
            <Collapse key={favorite.name}>
              <HomeFavoritesLinkItem favorite={favorite} />
            </Collapse>
          ))
        )}
      </TransitionGroup>
    </List>
  )
}
