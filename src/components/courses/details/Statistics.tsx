import { Card, Divider, Stack, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { courseDetailsViewAtom } from '../../../contexts/courses'
import { type CourseDetails } from '../../../index.d'
import { scoreMap } from '../../../utils/calc'

interface CourseDetailsStatistics {
  details: CourseDetails
}

export const CourseDetailsStatistics = ({
  details,
}: CourseDetailsStatistics) => {
  const courseDetailsView = useAtomValue(courseDetailsViewAtom)

  const statistics = useMemo(
    () =>
      details.statistics.find(
        stat => stat.name === courseDetailsView.statistics
      ) || details.statistics?.[0],
    [details.statistics]
  )

  const getScore = (score: string) => {
    const num = Number(score)
    if (isNaN(num)) return scoreMap(score)
    return num
  }

  const { count, excellent, failed, average, pows } = useMemo(
    () =>
      statistics.scores.reduce(
        (pre, cur) => {
          const entries = Object.entries(cur.data)
          const count = Object.values(cur.data).reduce((p, c) => p + c, 0)
          const scores = entries.reduce((p, c) => p + getScore(c[0]) * c[1], 0)
          const excellent = entries
            .filter(c => getScore(c[0]) >= 90)
            .reduce((p, c) => p + c[1], 0)
          const failed = entries
            .filter(c => getScore(c[0]) < 60)
            .reduce((p, c) => p + c[1], 0)

          // 计算标准差
          const average = scores / count
          const pows = entries.reduce(
            (p, c) => p + Math.pow(getScore(c[0]) - average, 2) * c[1],
            0
          )

          return {
            count: pre.count + count,
            scores: pre.scores + scores,
            excellent: pre.excellent + excellent,
            failed: pre.failed + failed,
            average,
            pows: pre.pows + pows,
          }
        },
        { count: 0, scores: 0, excellent: 0, failed: 0, average: 0, pows: 0 }
      ),
    [details.statistics]
  )

  return (
    <Card variant="outlined">
      <Stack
        divider={<Divider orientation="horizontal" sx={{ height: 'auto' }} />}
        sx={{ overflowX: 'auto' }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
          sx={{ width: '100%', flex: 1 }}
        >
          <StatsCard
            title="优秀率"
            content={`${((excellent / count) * 100).toFixed(2)}%`}
            color={green[400]}
            subtitle={`${excellent} 人`}
          />
          <StatsCard
            title="挂科率"
            content={`${((failed / count) * 100).toFixed(2)}%`}
            color={red[400]}
            subtitle={`${failed} 人`}
          />
        </Stack>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
          sx={{ width: '100%', flex: 1 }}
        >
          <StatsCard
            title="平均分"
            content={average.toFixed(2)}
            unit="分"
            subtitle={`σ = ${Math.sqrt(pows / count).toFixed(2)}`}
          />
          <StatsCard
            title="统计人次"
            content={statistics.count}
            unit="人"
            subtitle={courseDetailsView.statistics}
          />
        </Stack>
      </Stack>
    </Card>
  )
}

interface StatsCardProps {
  title: string
  subtitle?: string
  color?: string
  content: string | number
  unit?: string
}

const StatsCard = ({
  title,
  subtitle,
  content,
  unit,
  color,
}: StatsCardProps) => (
  <Stack
    spacing={0.75}
    sx={{ px: 2.25, py: 2, flex: 1, width: '100%', overflow: 'hidden' }}
  >
    <Typography
      variant="body2"
      component="span"
      sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
    >
      {title}
    </Typography>
    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontWeight: 700,
          fontSize: '1.25rem',
          color: color || 'text.primary',
        }}
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
    {subtitle && (
      <Typography
        variant="body2"
        component="span"
        sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
      >
        {subtitle}
      </Typography>
    )}
  </Stack>
)
