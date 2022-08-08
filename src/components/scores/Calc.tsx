import { Card, Divider, Stack, Typography } from '@mui/material'
import { useAtomValue } from 'jotai'
import { scoresListAtom } from '../../contexts/scores'
import { scoreMap } from '../../utils/calc'

export const ScoresCalc = () => {
  const scoresList = useAtomValue(scoresListAtom)

  const selectedScores = scoresList.filter(s => s.selected)
  const isSelected = selectedScores.length > 0
  const calcScores = isSelected ? selectedScores : scoresList

  const calcCredits = () => calcScores.reduce((pre, cur) => pre + cur.credit, 0)
  const calcAverage = () => {
    const credits = calcCredits()
    if (credits === 0) return 0
    return (
      calcScores.reduce((pre, cur) => {
        const best = Math.max(...cur.score.map(s => scoreMap(s)))
        return pre + cur.credit * best
      }, 0) / credits
    ).toFixed(2)
  }

  const calcExcellent = () =>
    calcScores.filter(score => score.score.some(s => scoreMap(s) >= 90)).length
  const calcFailed = () =>
    calcScores.filter(score => score.score.some(s => scoreMap(s) < 60)).length

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
          <CalcCard
            title={isSelected ? '已选课程' : '全部课程'}
            content={calcScores.length}
            unit="个"
          />
          <CalcCard
            title={isSelected ? '已选学分' : '全部学分'}
            content={calcCredits()}
            unit="分"
          />
        </Stack>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
          sx={{ width: '100%', flex: 1 }}
        >
          <CalcCard title="加权平均分" content={calcAverage()} unit="分" />

          <CalcCard
            title="优秀 / 挂科"
            content={`${calcExcellent()} / ${calcFailed()}`}
          />
        </Stack>
      </Stack>
    </Card>
  )
}

interface CalcCardProps {
  title: string
  content: string | number
  unit?: string
}

const CalcCard = ({ title, content, unit }: CalcCardProps) => (
  <Stack spacing={1} sx={{ px: 2, py: 1.75, flex: 1, width: '100%' }}>
    <Typography
      variant="body2"
      component="span"
      sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
    >
      {title}
    </Typography>
    <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          fontVariantNumeric: 'tabular-nums',
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
  </Stack>
)
