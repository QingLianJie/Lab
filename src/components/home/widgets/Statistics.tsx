import {
  BrowseGalleryOutlined,
  RefreshOutlined,
  TableChartOutlined,
} from '@mui/icons-material'
import {
  Button,
  Card,
  CardActionArea,
  Chip,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { bridgeAtom, studentAtom } from '../../../contexts/bridge'
import { modalsAtom } from '../../../contexts/modals'
import { schedulesAtom, schedulesViewAtom } from '../../../contexts/schedules'
import { scoresAtom } from '../../../contexts/scores'
import { scoreMap } from '../../../utils/calc'
import { calendarTime } from '../../../utils/format'
import { SettingsGoAction } from '../../settings/Fetch'

export const HomeStatisticsWidget = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const schedules = useAtomValue(schedulesAtom)
  const scores = useAtomValue(scoresAtom)

  const student = useAtomValue(studentAtom)
  const bridge = useAtomValue(bridgeAtom)

  const handleFetch = () => {
    if (!bridge)
      enqueueSnackbar('未安装插件，请前往设置页面安装', {
        action: <SettingsGoAction name="extension" />,
      })
    else if (!student)
      enqueueSnackbar('未添加 HEU 账号，请前往设置页面添加', {
        action: <SettingsGoAction name="bridge" />,
      })
    else setModals({ ...modals, captcha: true })
  }

  const calcCredits = () =>
    scores ? scores.scores.reduce((pre, cur) => pre + cur.credit, 0) : 0
  const calcAverage = () => {
    const credits = calcCredits()
    if (credits === 0) return 0
    return (
      (scores
        ? scores.scores.reduce((pre, cur) => {
            const best = Math.max(...cur.score.map(s => scoreMap(s)))
            return pre + cur.credit * best
          }, 0)
        : 0) / credits
    ).toFixed(2)
  }

  const calcExcellent = () =>
    scores
      ? scores.scores.filter(score => score.score.some(s => scoreMap(s) >= 90))
          .length
      : 0
  const calcFailed = () =>
    scores
      ? scores.scores.filter(score => score.score.some(s => scoreMap(s) < 60))
          .length
      : 0

  const schdulesCoursesLength = schedules
    ? new Set([...schedules.timetable.courses.main.map(course => course.name)])
        .size +
      new Set([
        ...schedules.timetable.courses.remark.map(course => course.name),
      ]).size
    : 0

  return (
    <Card variant="outlined">
      <Stack spacing={1} sx={{ pt: 2, pb: 1.75 }}>
        <Typography variant="body1" sx={{ px: 2.25, fontWeight: 700 }}>
          成绩和课表
        </Typography>
        {scores && schedules ? (
          <Stack spacing={0.25} sx={{ px: 2.25 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              数据最后更新于{' '}
              <Typography
                component="time"
                sx={{ fontSize: 'inherit', fontWeight: 700 }}
              >
                {calendarTime(scores.date)}
              </Typography>
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Chip
                label="HEU"
                size="small"
                sx={{
                  fontSize: 'caption.fontSize',
                  fontWeight: 700,
                  height: 'auto',
                  px: 0.1,
                  py: 0.1,
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {student ? student.id : '未知 ID'}
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={0.5} sx={{ pt: 3, pb: 4, alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              暂无成绩和课表数据
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              请重新获取
            </Typography>
          </Stack>
        )}
      </Stack>

      <Divider />
      {scores && schedules && (
        <Fragment>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
            sx={{ width: '100%', flex: 1 }}
          >
            <StatsCard
              title="已学课程"
              content={scores ? scores.scores.length : 0}
              unit="个"
            />
            <StatsCard
              title="学期课程"
              content={schdulesCoursesLength}
              unit="个"
            />
          </Stack>
          <Divider />
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
            sx={{ width: '100%', flex: 1 }}
          >
            <StatsCard title="加权平均分" content={calcAverage()} unit="分" />
            <StatsCard
              title="优秀 / 挂科"
              content={`${calcExcellent()} / ${calcFailed()}`}
            />
          </Stack>
        </Fragment>
      )}

      <Divider />
      <CardActionArea onClick={handleFetch} sx={{ pl: 2.25, pr: 2, py: 1.5 }}>
        <Stack
          direction="row"
          spacing={2.5}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            重新获取数据
          </Typography>
          <RefreshOutlined
            sx={{ color: 'text.disabled', width: 20, height: 20 }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  )
}

interface StatsCardProps {
  title: string
  content: string | number
  unit?: string
}

const StatsCard = ({ title, content, unit }: StatsCardProps) => (
  <Stack
    spacing={0.5}
    sx={{
      px: 2.25,
      pt: 2,
      pb: 1.75,
      flex: 1,
      width: '100%',
      overflow: 'hidden',
    }}
  >
    <Typography
      variant="body2"
      sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
    >
      {title}
    </Typography>
    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
      <Typography
        variant="body1"
        sx={{ fontSize: '1.125rem', fontWeight: 700 }}
      >
        {content}
      </Typography>
      <Typography
        variant="body2"
        component="span"
        sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
      >
        {unit}
      </Typography>
    </Stack>
  </Stack>
)
