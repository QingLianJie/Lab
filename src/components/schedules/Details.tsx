import {
  CalendarMonthOutlined,
  PlaceOutlined,
  ScheduleOutlined,
  SchoolOutlined,
  type SvgIconComponent,
} from '@mui/icons-material'
import {
  Button,
  Card,
  Fade,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { amber, blue, green, red } from '@mui/material/colors'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type SummaryCourse, type SummaryRemarkCourse } from '../../index.d'
import { sections } from '../../configs/schedules/table'
import { modalsAtom } from '../../contexts/booleans'
import { formatNumbers } from '../../utils/format'

export const SchedulesDetails = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const [cache, setCache] = useState<SummaryCourse[] | SummaryRemarkCourse[]>(
    []
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (modals.schedules.details) setCache(modals.schedules.details)
  }, [modals.schedules.details])

  const handleSearch = (name: string) => {
    navigate(`/courses?search=${name}`)
    setModals({
      ...modals,
      schedules: { ...modals.schedules, details: false },
    })
  }

  const formatRange = (week: number[]) =>
    formatNumbers(week)
      .map(arr =>
        arr.length === 1 ? `${arr[0]}` : `${arr[0]}-${arr[arr.length - 1]}`
      )
      .join(', ')

  const formatTime = (section: number[]) =>
    formatNumbers(section)
      .map(arr =>
        arr.length === 1
          ? `${sections.find(section => section.id === arr[0])?.time[0]}-${
              sections.find(section => section.id === arr[0])?.time[1]
            }`
          : `${sections.find(section => section.id === arr[0])?.time[0]}-${
              sections.find(section => section.id === arr[arr.length - 1])
                ?.time[1]
            }`
      )
      .join(', ')

  return (
    <Modal
      keepMounted
      open={!!modals.schedules.details}
      onClose={() =>
        setModals({
          ...modals,
          schedules: { ...modals.schedules, details: false },
        })
      }
      closeAfterTransition
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={!!modals.schedules.details}>
        <Stack>
          {cache && (
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              {cache.map((course, index) => (
                <Card key={index} sx={{ width: '16rem', boxShadow: 18 }}>
                  <Stack spacing={1} sx={{ height: '100%', py: 2 }}>
                    <Typography sx={{ fontWeight: 700, px: 2.5 }}>
                      {course.name}
                    </Typography>
                    <List sx={{ flex: 1 }}>
                      <CourseItem icon={CalendarMonthOutlined} color={red}>
                        {formatRange(course.week)} 周
                      </CourseItem>

                      {'section' in course && (
                        <CourseItem
                          icon={ScheduleOutlined}
                          color={amber}
                          text={`${formatRange(course.section)} 节 ${formatTime(
                            course.section
                          )}`}
                        >
                          <Typography>
                            {formatRange(course.section)} 节
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatTime(course.section)}
                          </Typography>
                        </CourseItem>
                      )}

                      <CourseItem icon={SchoolOutlined} color={blue}>
                        {course.teacher.join(', ')}
                      </CourseItem>

                      {'location' in course && (
                        <CourseItem icon={PlaceOutlined} color={green}>
                          {course.location || '无地点'}
                        </CourseItem>
                      )}
                    </List>
                    <Stack sx={{ px: 2 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleSearch(course.name)}
                      >
                        搜索相关课程
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>
      </Fade>
    </Modal>
  )
}

interface CourseItemProps {
  icon: SvgIconComponent
  children: ReactNode
  color: { [key: string]: string }
  text?: string
}

const CourseItem = ({ icon, color, children, text }: CourseItemProps) => {
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          py: 0.5,
          px: 2.5,
          alignItems: 'flex-start',
          '&:hover svg': { color: color[isDark ? 400 : 500] },
        }}
        onClick={() =>
          navigator.clipboard
            .writeText(text || children?.toString() || '')
            .then(() => enqueueSnackbar('✅ 已复制'))
        }
      >
        <ListItemIcon sx={{ minWidth: 36, mt: 0.75 }}>
          <Icon
            component={icon}
            sx={{
              fontSize: 20,
              color: 'text.disabled',
              transition: 'all 0.2s',
            }}
          />
        </ListItemIcon>
        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  )
}
