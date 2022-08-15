import { CheckOutlined, ExpandMoreOutlined } from '@mui/icons-material'
import {
  Button,
  Card,
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { amber, green, red } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { type SVGProps, useEffect, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  XAxis,
  ReferenceLine,
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

  const scoresTypes = statistics
    ? statistics.scores.map(score => score.type)
    : []

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
          mb: 1.5,
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
              axisLine={{ strokeOpacity: '50%' }}
            />
            <YAxis
              width={30}
              tickMargin={10}
              tickLine={false}
              minTickGap={10}
              tick={<CustomYAxisTick />}
              axisLine={{ strokeOpacity: '50%' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid strokeDasharray="2 3" opacity={0.5} />
            <ReferenceLine x="60" stroke={amber[400]} />
            <Bar dataKey="count" fill={red[400]} />
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  )
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        variant="elevation"
        elevation={12}
        sx={{
          minWidth: 96,
          outline: 'none',
          px: 2,
          pt: 1.5,
          pb: 1.25,
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
          <Stack spacing={0.75} direction="row" sx={{ alignItems: 'baseline' }}>
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
        </Stack>
      </Paper>
    )
  }

  return null
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
