import {
  CheckOutlined,
  ExpandMoreOutlined,
  SchoolOutlined,
} from '@mui/icons-material'
import {
  Card,
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Button from '@mui/material/Button'
import { useAtom, useAtomValue } from 'jotai'
import { range } from 'lodash'
import { Fragment, useState } from 'react'
import { CourseDetails } from '../../..'
import { courseDetailsViewAtom } from '../../../contexts/courses'
import { CourseDetailsExport } from './actions/Export'
import { CourseDetailsShare } from './actions/Share'

interface CourseDetailsToolBarProps {
  details: CourseDetails
}

export const CourseDetailsToolBar = ({
  details,
}: CourseDetailsToolBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [courseDetailsView, setCourseDetailsView] = useAtom(
    courseDetailsViewAtom
  )

  return (
    <Card variant="outlined">
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
        }}
      >
        <Stack
          direction="row"
          sx={{
            flex: 1,
            ml: -0.5,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Button
            sx={{ px: 1.75, py: 1 }}
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <Typography
              sx={{
                fontSize: 'body1.fontSize',
                fontWeight: 700,
                color: 'text.primary',
                pr: 1,
              }}
            >
              {courseDetailsView.statistics}
            </Typography>
            <ExpandMoreOutlined
              sx={{
                color: 'text.disabled',
                width: 20,
                height: 20,
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            TransitionComponent={Fade}
            PaperProps={{ sx: { maxHeight: 240 } }}
          >
            {details.statistics.map(item => (
              <MenuItem
                onClick={e => {
                  setCourseDetailsView(view => ({
                    ...view,
                    statistics: item.name,
                  }))
                  setAnchorEl(null)
                }}
                key={item.name}
                sx={{ minWidth: 180, minHeight: 'unset' }}
              >
                <ListItemText sx={{ flex: 1 }}>{item.name}</ListItemText>
                {item.name === courseDetailsView.statistics && (
                  <ListItemIcon sx={{ pl: 2 }}>
                    <CheckOutlined sx={{ fontSize: 20 }} />
                  </ListItemIcon>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Stack>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            flex: 1,
            px: 0.5,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <CourseDetailsShare details={details} />
          <CourseDetailsExport details={details} />
        </Stack>
      </Stack>
    </Card>
  )
}
