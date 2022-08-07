import {
  StarRounded,
  StarOutlineRounded,
  VpnLockOutlined,
  PublicOutlined,
} from '@mui/icons-material'
import {
  ListItem,
  IconButton,
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { amber } from '@mui/material/colors'
import { useAtom } from 'jotai'
import { Favorite, favoritesAtom } from '../../../contexts/links'
import { Tooltip } from '../../base/styled/Tooltip'

interface HomeFavoritesLinkItemProps {
  favorite: Favorite
}

export const HomeFavoritesLinkItem = ({
  favorite,
}: HomeFavoritesLinkItemProps) => {
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
