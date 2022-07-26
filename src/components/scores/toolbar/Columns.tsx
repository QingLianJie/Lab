import { VisibilityOutlined, CheckOutlined } from '@mui/icons-material'
import {
  IconButton,
  Menu,
  Collapse,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Fade,
} from '@mui/material'
import { useAtom } from 'jotai'
import { useState, Fragment } from 'react'
import { columns, ColumnsType } from '../../../configs/scores/columns'
import { scoresViewAtom } from '../../../contexts/bridge/scores'
import { Tooltip } from '../../base/Tooltip'

export const Columns = () => {
  const [scoresView, setScoresView] = useAtom(scoresViewAtom)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleColumns = (name: ColumnsType) => {
    if (scoresView.columns.includes(name))
      setScoresView({
        ...scoresView,
        columns: scoresView.columns.filter(item => item !== name),
      })
    else
      setScoresView({ ...scoresView, columns: [...scoresView.columns, name] })
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Tooltip title="显示列" arrow placement="top">
        <IconButton
          aria-label="显示列"
          sx={{ color: 'text.secondary' }}
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <VisibilityOutlined
            sx={{
              color: 'text.disabled',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s',
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
      >
        {columns.map(column => (
          <MenuItem
            onClick={() => handleColumns(column.id as ColumnsType)}
            key={column.id}
            sx={{ minWidth: 140 }}
          >
            <ListItemText sx={{ flex: 1 }}>{column.name}</ListItemText>
            {scoresView.columns.includes(column.id as ColumnsType) && (
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
