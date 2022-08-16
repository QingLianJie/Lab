import { CheckOutlined, ExpandMoreOutlined } from '@mui/icons-material'
import {
  Button,
  Card,
  Divider,
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { amber, blue, green, red } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { Fragment, useEffect, useMemo, useState, type SVGProps } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import {
  type NameType,
  type ValueType,
} from 'recharts/types/component/DefaultTooltipContent.d'
import {
  courseDetailsAtom,
  courseDetailsViewAtom,
} from '../../../../routers/courses/[id]'
import { scoreMap } from '../../../../utils/calc'

export const CourseDetailsBarChart = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const courseDetailsView = useAtomValue(courseDetailsViewAtom)
  const courseDetails = useAtomValue(courseDetailsAtom)

  const statistics = useMemo(() => {
    if (!courseDetails) return false
    return (
      courseDetails.statistics.find(
        stat => stat.name === courseDetailsView.statistics
      ) || courseDetails.statistics?.[0]
    )
  }, [courseDetails, courseDetailsView.statistics])

  const scoresTypes = useMemo(
    () => (statistics ? statistics.scores.map(score => score.type) : []),
    [statistics]
  )

  const [type, setType] = useState(scoresTypes?.[0] || '分数制')

  useEffect(() => {
    setType(scoresTypes?.[0] || '分数制')
  }, [scoresTypes])

  const chartData = useMemo(() => {
    if (!statistics) return []
    const data = statistics.scores.find(score => score.type === type)
    if (!data) return []

    const scores = Object.entries(data.data)
    if (type === '分数制')
      return scores.map(([key, value]) => ({
        score: key,
        count: value,
      }))
    return ['不及格', '及格', '中等', '良好', '优秀'].map(score => ({
      score,
      count: scores.find(([key, value]) => key === score)?.[1] || 0,
    }))
  }, [type, courseDetailsView.statistics, courseDetails])

  const maxCount = useMemo(
    () => Math.max(...chartData.map(data => data.count)),
    [chartData]
  )

  const dataCount = useMemo(
    () => chartData.reduce((pre, cur) => pre + cur.count, 0),
    [chartData]
  )

  const calcMiddle = useMemo(() => {
    let half = dataCount / 2
    let middle = ''
    chartData.reduce((pre, cur) => {
      if (pre + cur.count >= half && pre < half) middle = cur.score
      return pre + cur.count
    }, 0)
    return middle
  }, [chartData])

  const calcAverage = useMemo(
    () =>
      Math.round(
        chartData.reduce(
          (pre, cur) => pre + scoreMap(Number(cur.score)) * cur.count,
          0
        ) / dataCount
      ).toString(),
    [chartData]
  )

  return (
    <Card variant="outlined">
      <Stack
        spacing={2}
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          py: 1.25,
          pl: 2.25,
          pr: 1.25,
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: 'text.primary', fontWeight: 700 }}
        >
          成绩分布
        </Typography>

        <Button
          color="primary"
          onClick={e => setAnchorEl(e.currentTarget)}
          sx={{
            width: 'fit-content',
            py: 0.375,
            pr: 1.25,
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 'body2.fontSize',
              fontWeight: 700,
              color: 'text.primary',
              pr: 0.5,
              py: 0.5,
            }}
          >
            {type}
          </Typography>
          <ExpandMoreOutlined
            sx={{
              color: 'text.disabled',
              width: 20,
              height: 20,
              transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          TransitionComponent={Fade}
        >
          {scoresTypes.map(item => (
            <MenuItem
              key={item}
              selected={item === type}
              onClick={() => setType(item)}
              sx={{ minWidth: 120, minHeight: 'unset' }}
            >
              <ListItemText sx={{ flex: 1 }}>{item}</ListItemText>
              {item === type && (
                <ListItemIcon sx={{ pl: 2 }}>
                  <CheckOutlined sx={{ fontSize: 20 }} />
                </ListItemIcon>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
      <Stack
        sx={{
          mx: 2.5,
          mb: 1,
          height: 300,
          maxHeight: 300,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap="50%" barCategoryGap="20%">
            <XAxis
              dataKey="score"
              type={type === '分数制' ? 'number' : 'category'}
              tickMargin={10}
              tickCount={100}
              tickLine={false}
              minTickGap={20}
              tick={<CustomXAxisTick />}
              axisLine={{ stroke: '#999', opacity: 0.5 }}
            />
            <YAxis
              width={maxCount >= 1000 ? 40 : maxCount >= 100 ? 30 : 25}
              tickMargin={10}
              tickLine={false}
              minTickGap={10}
              tick={<CustomYAxisTick />}
              allowDecimals={false}
              axisLine={{ stroke: '#999', opacity: 0.5 }}
            />
            <Tooltip
              content={
                <CustomTooltip
                  middle={type === '分数制' ? calcMiddle : undefined}
                  average={type === '分数制' ? calcAverage : undefined}
                />
              }
            />
            <CartesianGrid opacity={0.25} />
            <Bar dataKey="count" fill={red[400]} />
            {type === '分数制' && (
              <Fragment>
                <ReferenceLine x="60" isFront stroke={amber[400]} />
                <ReferenceLine
                  x={calcMiddle || undefined}
                  isFront
                  stroke={blue[400]}
                />

                <ReferenceLine
                  x={calcAverage || undefined}
                  isFront
                  stroke={green[400]}
                />
              </Fragment>
            )}
          </BarChart>
        </ResponsiveContainer>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          py: 1.75,
          px: 2.25,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {courseDetailsView.statistics} 数据的成绩分布
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {statistics ? statistics.count : 0} 个统计数据
        </Typography>
      </Stack>
    </Card>
  )
}

const CustomTooltip = ({
  active,
  payload,
  label,
  middle,
  average,
}: TooltipProps<ValueType, NameType> & {
  middle?: string
  average?: string
}) => {
  const isMiddle = middle === label
  const isAverage = average === label
  const isPass = label === '60'

  return (
    <Fragment>
      {active && payload && payload.length && (
        <Paper
          variant="elevation"
          elevation={12}
          sx={{
            minWidth: 96,
            outline: 'none',
            px: 2,
            py: 1.5,
            pointerEvents: 'none',
          }}
        >
          <Stack>
            <Typography
              variant="body2"
              component="p"
              sx={{ color: 'text.secondary' }}
            >
              成绩 {label}
            </Typography>
            <Stack
              spacing={0.75}
              direction="row"
              sx={{ alignItems: 'baseline' }}
            >
              <Typography variant="h6" component="p" sx={{ fontWeight: 700 }}>
                {payload[0].value}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: 'text.secondary' }}
              >
                人
              </Typography>
            </Stack>
            {isAverage && (
              <Typography
                variant="body2"
                component="p"
                sx={{ fontWeight: 700, color: green[400] }}
              >
                平均分
              </Typography>
            )}

            {isPass && (
              <Typography
                variant="body2"
                component="p"
                sx={{ fontWeight: 700, color: amber[500] }}
              >
                及格线
              </Typography>
            )}

            {isMiddle && (
              <Typography
                variant="body2"
                component="p"
                sx={{ fontWeight: 700, color: blue[400] }}
              >
                中位数
              </Typography>
            )}
          </Stack>
        </Paper>
      )}
    </Fragment>
  )
}

const CustomXAxisTick = ({ x, y, ...props }: SVGProps<SVGTextElement>) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={8}
      textAnchor="middle"
      fill="#999"
      fontSize="0.875rem"
    >
      {/* @ts-ignore */}
      {props.payload.value}
    </text>
  </g>
)

const CustomYAxisTick = ({ x, y, ...props }: SVGProps<SVGTextElement>) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={4}
      dx={6}
      fill="#999"
      textAnchor="end"
      fontSize="0.875rem"
    >
      {/* @ts-ignore */}
      {props.payload.value}
    </text>
  </g>
)
