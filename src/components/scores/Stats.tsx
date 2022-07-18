import {
  Card,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { scoresListAtom } from '../../contexts/bridge/scores'
import { scoreMap } from '../../utils/calc'

export const Stats = () => {
  const scoresList = useAtomValue(scoresListAtom)
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const calcCredits = () => scoresList.reduce((pre, cur) => pre + cur.credit, 0)
  const calcAverage = () => {
    const credits = calcCredits()
    if (credits === 0) return 0
    return (
      scoresList.reduce(
        (pre, cur) => pre + cur.credit * scoreMap(cur.score),
        0
      ) / credits
    )
  }

  const calcExcellent = () =>
    scoresList.filter(score => scoreMap(score.score) >= 90).length
  const calcFailed = () =>
    scoresList.filter(score => scoreMap(score.score) < 60).length

  return (
    <Card variant="outlined">
      <Stack
        direction={{ xs: 'row', sm: 'column' }}
        divider={
          <Divider
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{ height: isMobile ? 'auto' : 'auto' }}
          />
        }
        sx={{ overflowX: 'auto' }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
          sx={{ width: '100%', flex: 1 }}
        >
          <StatCard title="已选课程" content={scoresList.length} />
          <StatCard title="已选学分" content={calcCredits()} />
        </Stack>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
          sx={{ width: '100%', flex: 1 }}
        >
          <StatCard title="加权平均分" content={calcAverage()} />

          <StatCard
            title="优秀 / 挂科"
            content={`${calcExcellent()} / ${calcFailed()}`}
          />
        </Stack>
      </Stack>
    </Card>
  )
}

interface StatCardProps {
  title: string
  content: string | number
}

const StatCard = ({ title, content }: StatCardProps) => (
  <Stack spacing={1} sx={{ p: 2, flex: 1, width: '100%' }}>
    <Typography
      variant="body2"
      component="span"
      sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
    >
      {title}
    </Typography>

    <Typography
      variant="h5"
      component="span"
      sx={{
        fontWeight: 700,
        fontSize: { xs: '1.25rem', sm: '1.5rem' },
      }}
    >
      {content}
    </Typography>
  </Stack>
)
