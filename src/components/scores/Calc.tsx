import { ExpandLessOutlined, HorizontalRuleOutlined } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  Divider,
  Icon,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { scoresListAtom, scoresViewAtom } from '../../contexts/scores'
import { scoreMap } from '../../utils/calc'
import { Tooltip } from '../base/styled/Tooltip'

export const ScoresCalc = () => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const scoresList = useAtomValue(scoresListAtom)
  const [scoresView, setScoresView] = useAtom(scoresViewAtom)

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

      {!isMobile && (
        <Fragment>
          <Divider />
          <Tooltip
            title={scoresView.pin ? '取消固定在顶部' : '固定在顶部'}
            arrow
            placement="top"
          >
            <CardActionArea
              onClick={() =>
                setScoresView(view => ({ ...view, pin: !view.pin }))
              }
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 0.25,
                px: 2,
              }}
            >
              <Icon
                component={
                  scoresView.pin ? ExpandLessOutlined : HorizontalRuleOutlined
                }
                sx={{ width: 20, height: 20, color: 'text.disabled' }}
              />
            </CardActionArea>
          </Tooltip>
        </Fragment>
      )}
    </Card>
  )
}

interface CalcCardProps {
  title: string
  content: string | number
  unit?: string
}

const CalcCard = ({ title, content, unit }: CalcCardProps) => (
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
        sx={{ fontWeight: 700, fontSize: '1.25rem' }}
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
