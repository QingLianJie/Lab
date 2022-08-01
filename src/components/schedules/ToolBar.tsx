import { CheckOutlined, SchoolOutlined } from '@mui/icons-material'
import {
  ButtonGroup,
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
import { groups, GroupsType } from '../../configs/scores/groups'
import { studentAtom } from '../../contexts/bridge'
import {
  schedulesAtom,
  schedulesViewAtom,
} from '../../contexts/bridge/schedules'
import { termName } from '../../utils/calc'
import { Tooltip } from '../base/styled/Tooltip'
import { SchedulesCalendarAction } from './actions/Calendar'
import { SchedulesExportAction } from './actions/Export'
import { SchedulesUpdateAction } from './actions/Update'

export const SchedulesToolBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const schedules = useAtomValue(schedulesAtom)
  const [schedulesView, setSchedulesView] = useAtom(schedulesViewAtom)
  const currentSchedule = schedules
    ? schedules.timetable.weeks[schedulesView.week - 1]
    : false

  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const student = useAtomValue(studentAtom)

  const handleChange = (week: number) => {
    setSchedulesView(view => ({ ...view, week }))
  }

  return (
    <Card variant="outlined">
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 1, md: 1.5 },
          py: 0.5,
        }}
      >
        {isMobile ? (
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
              sx={{
                fontSize: 'body1.fontSize',
                fontWeight: 700,
                color: 'text.primary',
                px: 1.5,
              }}
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              第 {schedulesView.week} 周
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              TransitionComponent={Fade}
              PaperProps={{ sx: { maxHeight: 240 } }}
            >
              {range(1, schedules ? schedules.timetable.weeks.length : 1).map(
                item => (
                  <MenuItem
                    onClick={e => {
                      setSchedulesView({ ...schedulesView, week: item })
                      setAnchorEl(null)
                    }}
                    key={item}
                    sx={{ minWidth: 140, minHeight: 'unset' }}
                  >
                    <ListItemText sx={{ flex: 1 }}>第 {item} 周</ListItemText>
                    {item === schedulesView.week && (
                      <ListItemIcon sx={{ pl: 2 }}>
                        <CheckOutlined sx={{ fontSize: 20 }} />
                      </ListItemIcon>
                    )}
                  </MenuItem>
                )
              )}
            </Menu>
          </Stack>
        ) : (
          <Fragment>
            <Stack
              direction="row"
              sx={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography sx={{ fontWeight: 700, px: 1, whiteSpace: 'nowrap' }}>
                {schedules && schedules.timetable.name && student
                  ? `${termName(
                      // 这个地方逻辑不严谨，不能从学号获取入学年份，
                      // 因为没法适配研究生的学号，之后需要改
                      parseInt(student.id.slice(0, 4)),
                      schedules.timetable.name
                    )} ｜ ${schedules.timetable.name}`
                  : '没有课表数据'}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}
            >
              <Pagination
                color="primary"
                count={schedules ? schedules.timetable.weeks.length : 18}
                page={schedulesView.week}
                onChange={(_e, v) => handleChange(v)}
                disabled={!schedules}
                sx={{
                  '& .MuiPaginationItem-root.Mui-selected': { fontWeight: 700 },
                }}
              />
            </Stack>
          </Fragment>
        )}

        <Stack
          direction="row"
          spacing={0.5}
          sx={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <SchedulesCalendarAction />
          <SchedulesUpdateAction />
          <Tooltip title="查看学校页面" arrow placement="top">
            <IconButton
              aria-label="查看学校页面"
              href="https://edusys.wvpn.hrbeu.edu.cn/jsxsd/xskb/xskb_list.do"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.disabled',
                '&:hover': { color: 'text.primary' },
                transition: 'all 0.2s',
              }}
            >
              <SchoolOutlined />
            </IconButton>
          </Tooltip>
          <SchedulesExportAction />
        </Stack>
      </Stack>
    </Card>
  )
}
