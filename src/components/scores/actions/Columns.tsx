import { VisibilityOutlined, CheckOutlined } from '@mui/icons-material'
import {
  IconButton,
  Menu,
  Collapse,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Fade,
  Divider,
} from '@mui/material'
import { useAtom } from 'jotai'
import { useState, Fragment } from 'react'
import { columns, ScoreColumnKey } from '../../../configs/scores/columns'
import { scoresViewAtom } from '../../../contexts/bridge/scores'
import { Tooltip } from '../../base/Tooltip'

export const Columns = () => {
  const [scoresView, setScoresView] = useAtom(scoresViewAtom)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleColumns = (name: ScoreColumnKey) => {
    if (scoresView.columns.includes(name))
      setScoresView({
        ...scoresView,
        columns: scoresView.columns.filter(item => item !== name),
      })
    else
      setScoresView({ ...scoresView, columns: [...scoresView.columns, name] })
    setAnchorEl(null)
  }

  const handleAllColumns = () => {
    setScoresView({ ...scoresView, columns: columns.map(item => item.id) })
    setAnchorEl(null)
  }

  const handleSimpleColumns = () => {
    setScoresView({ ...scoresView, columns: ['name', 'score'] })
    setAnchorEl(null)
  }

  const handleDefaultColumns = () => {
    setScoresView({
      ...scoresView,
      columns: ['name', 'type', 'credit', 'nature', 'score'],
    })
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
            onClick={() => handleColumns(column.id as ScoreColumnKey)}
            key={column.id}
            sx={{ minWidth: 140, minHeight: 'unset' }}
          >
            <ListItemText sx={{ flex: 1 }}>{column.name}</ListItemText>
            {scoresView.columns.includes(column.id as ScoreColumnKey) && (
              <ListItemIcon sx={{ pl: 2 }}>
                <CheckOutlined sx={{ fontSize: 20 }} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={handleAllColumns}
          sx={{ minWidth: 140, minHeight: 'unset' }}
        >
          <ListItemText sx={{ flex: 1 }}>全部列</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleSimpleColumns}
          sx={{ minWidth: 140, minHeight: 'unset' }}
        >
          <ListItemText sx={{ flex: 1 }}>仅名称和成绩</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleDefaultColumns}
          sx={{ minWidth: 140, minHeight: 'unset' }}
        >
          <ListItemText sx={{ flex: 1 }}>默认值</ListItemText>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}
