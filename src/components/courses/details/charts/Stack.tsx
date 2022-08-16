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
  useTheme,
} from '@mui/material'
import { green, red } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { Fragment, useMemo, useState, type SVGProps } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from 'recharts'
import {
  type NameType,
  type ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import { courseDetailsAtom } from '../../../../routers/courses/[id]'
import { scoreMap } from '../../../../utils/calc'

export const CourseDetailsStackChart = () => {
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  const courseDetails = useAtomValue(courseDetailsAtom)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [type, setType] = useState<'人数' | '百分比'>('百分比')

  const getScore = (score: string) => {
    const num = Number(score)
    if (isNaN(num)) return scoreMap(score)
    return num
  }

  const chartData = useMemo(
    () =>
      courseDetails
        ? courseDetails.statistics.map(stat => {
            const { excellent, failed } = stat.scores.reduce(
              (pre, cur) => {
                const entries = Object.entries(cur.data)
                const excellent = entries
                  .filter(c => getScore(c[0]) >= 90)
                  .reduce((p, c) => p + c[1], 0)
                const failed = entries
                  .filter(c => getScore(c[0]) < 60)
                  .reduce((p, c) => p + c[1], 0)

                return {
                  excellent: pre.excellent + excellent,
                  failed: pre.failed + failed,
                }
              },
              { excellent: 0, failed: 0 }
            )
            return {
              name: stat.name,
              excellent: ((excellent * 100) / stat.count).toFixed(2),
              excellentCount: excellent,
              failed: ((failed * 100) / stat.count).toFixed(2),
              failedCount: failed,
            }
          })
        : [],
    [courseDetails]
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
          pt: 1.25,
          pb: 1,
          pl: 2.25,
          pr: 1.25,
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: 'text.primary', fontWeight: 700 }}
        >
          成绩统计
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
          {['百分比', '人数'].map(item => (
            <MenuItem
              key={item}
              selected={item === type}
              onClick={() => {
                setType(item as '百分比' | '人数')
                setAnchorEl(null)
              }}
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
          mx: { xs: 2, sm: 2.5 },
          mb: 1,
          height: 24 + chartData.length * 30,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={chartData}>
            <CartesianGrid opacity={0.25} />
            <XAxis
              type="number"
              tickMargin={10}
              tickLine={false}
              tick={<CustomXAxisTick count={type === '人数'} />}
              padding={{ right: 24 }}
              axisLine={{ stroke: '#999', opacity: 0.25 }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={92}
              interval={0}
              tickMargin={10}
              tickLine={false}
              minTickGap={0}
              tick={<CustomYAxisTick />}
              padding={{ top: 6, bottom: 6 }}
              axisLine={{ stroke: '#999', opacity: 0.25 }}
            />
            <Tooltip content={<CustomTooltip count={type === '人数'} />} />

            <Bar
              dataKey={type === '人数' ? 'failedCount' : 'failed'}
              barSize={10}
              stackId="1"
              fill={red[isDark ? 400 : 300]}
            />
            <Bar
              dataKey={type === '人数' ? 'excellentCount' : 'excellent'}
              barSize={10}
              stackId="1"
              fill={green[isDark ? 400 : 300]}
            />
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
  count,
}: TooltipProps<ValueType, NameType> & { count?: boolean }) => {
  return (
    <Fragment>
      {active && payload && payload.length && (
        <Paper
          variant="elevation"
          elevation={12}
          sx={{
            minWidth: 120,
            outline: 'none',
            px: 2,
            py: 1.5,
            pointerEvents: 'none',
          }}
        >
          <Stack spacing={0.5}>
            <Typography
              variant="body2"
              component="p"
              sx={{ color: 'text.secondary' }}
            >
              {label}
            </Typography>
            <Stack>
              <Stack
                spacing={0.75}
                direction="row"
                sx={{ alignItems: 'baseline' }}
              >
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: 700, color: green[400] }}
                >
                  优秀 {payload[1].value}
                  {count ? ' 人' : '%'}
                </Typography>
              </Stack>
              <Stack
                spacing={0.75}
                direction="row"
                sx={{ alignItems: 'baseline' }}
              >
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: 700, color: red[400] }}
                >
                  挂科 {payload[0].value}
                  {count ? ' 人' : '%'}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Fragment>
  )
}

export const CustomXAxisTick = ({
  x,
  y,
  ...props
}: SVGProps<SVGTextElement> & { count?: boolean }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={6}
      dx={2}
      textAnchor="middle"
      fill="#999"
      fontSize="0.8rem"
    >
      {/* @ts-ignore */}
      {props.payload.value}
      {props.count ? '' : '%'}
    </text>
  </g>
)

export const CustomYAxisTick = ({
  x,
  y,
  ...props
}: SVGProps<SVGTextElement>) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={4}
      dx={6}
      fill="#999"
      textAnchor="end"
      fontSize="0.8rem"
    >
      {/* @ts-ignore */}
      {props.payload.value}
    </text>
  </g>
)
