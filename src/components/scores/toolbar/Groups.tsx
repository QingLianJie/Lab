import { ViewStreamOutlined, CheckOutlined } from '@mui/icons-material'
import {
  IconButton,
  Menu,
  Grow,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Fade,
} from '@mui/material'
import { useAtom } from 'jotai'
import { useState, Fragment } from 'react'
import { type GroupsType, groups } from '../../../configs/scores/groups'
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
          sx={{ color: 'text.secondary' }}
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
            sx={{ minWidth: 120 }}
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
