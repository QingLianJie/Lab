import { CheckOutlined, ViewStreamOutlined } from '@mui/icons-material'
import {
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import { useAtom } from 'jotai'
import { Fragment, useState } from 'react'
import { groups, type GroupsType } from '../../../configs/scores/groups'
import { scoresViewAtom } from '../../../contexts/bridge/scores'
import { Tooltip } from '../../base/Tooltip'

export const Groups = () => {
  const [scoresView, setScoresView] = useAtom(scoresViewAtom)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleGroups = (name: GroupsType) => {
    setScoresView({ ...scoresView, groups: name })
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Tooltip title="分组" arrow placement="top">
        <IconButton
          aria-label="分组"
          sx={{
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <ViewStreamOutlined />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
      >
        {groups.map(item => (
          <MenuItem
            onClick={() => handleGroups(item.id as GroupsType)}
            key={item.id}
            sx={{ minWidth: 140, minHeight: 'unset' }}
          >
            <ListItemText sx={{ flex: 1 }}>{item.name}</ListItemText>
            {item.id === scoresView.groups && (
              <ListItemIcon sx={{ pl: 2 }}>
                <CheckOutlined sx={{ fontSize: 20 }} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
}
