import { CheckOutlined, VisibilityOutlined } from '@mui/icons-material'
import {
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import { Fragment, useState } from 'react'
import {
  columns,
  type CourseColumnKey,
} from '../../../../configs/courses/columns'
import { coursesViewAtom } from '../../../../contexts/courses'
import { useAtom } from 'jotai'
import { Tooltip } from '../../../base/styled/Tooltip'

export const CoursesListColumnsAction = () => {
  const [coursesView, setCoursesView] = useAtom(coursesViewAtom)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleColumns = (name: CourseColumnKey) => {
    if (coursesView.columns.includes(name))
      setCoursesView(view => ({
        ...view,
        columns: view.columns.filter(item => item !== name),
      }))
    else setCoursesView(view => ({ ...view, columns: [...view.columns, name] }))
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
            onClick={() => handleColumns(column.id as CourseColumnKey)}
            key={column.id}
            sx={{ minWidth: 140, minHeight: 'unset' }}
          >
            <ListItemText sx={{ flex: 1 }}>{column.name}</ListItemText>
            {coursesView.columns.includes(column.id as CourseColumnKey) && (
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
