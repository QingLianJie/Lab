import {
  DeleteOutlined,
  PublicOutlined,
  StarOutlineRounded,
  StarRounded,
  VpnLockOutlined,
} from '@mui/icons-material'
import {
  Icon,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { amber, red } from '@mui/material/colors'
import { useAtom, useAtomValue } from 'jotai'
import { Favorite, favoritesAtom } from '../../../contexts/links'
import { modesAtom } from '../../../contexts/modes'
import { Tooltip } from '../../base/styled/Tooltip'

interface HomeFavoritesLinkItemProps {
  favorite: Favorite
}

export const HomeFavoritesLinkItem = ({
  favorite,
}: HomeFavoritesLinkItemProps) => {
  const [favorites, setFavorites] = useAtom(favoritesAtom)
  const modes = useAtomValue(modesAtom)

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

  const handleRemove = () => {
    const ans = confirm(`确定要删除 ${favorite.name} 吗？`)
    if (!ans) return
    setFavorites(favorites =>
      favorites
        .map(group => {
          if ('children' in group) {
            return {
              ...group,
              children: group.children.filter(item => item.id !== favorite.id),
            }
          }
          return group
        })
        .filter(item => item.id !== favorite.id)
    )
  }

  return (
    <ListItem
      disablePadding
      secondaryAction={
        modes.favorites ? (
          <Tooltip title="删除这个链接" arrow placement="top">
            <IconButton
              aria-label="删除这个链接"
              edge="end"
              onClick={handleRemove}
              sx={{ right: '2.5px' }}
            >
              <DeleteOutlined sx={{ color: red[500], width: 22, height: 22 }} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip
            title={favorite.star ? '取消收藏' : '收藏'}
            arrow
            placement="top"
          >
            <IconButton
              aria-label="收藏链接"
              edge="end"
              onClick={handleStar}
              sx={{ right: '2.5px' }}
            >
              <Icon
                component={favorite.star ? StarRounded : StarOutlineRounded}
                sx={{ color: amber[500] }}
              />
            </IconButton>
          </Tooltip>
        )
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
            <Tooltip title="需要校园网" arrow placement="top">
              <VpnLockOutlined
                fontSize="small"
                sx={{ color: 'text.disabled' }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="可校外访问" arrow placement="top">
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
