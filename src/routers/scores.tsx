import {
  CheckOutlined,
  CloseOutlined,
  InsertChartRounded,
  RestartAltOutlined,
} from '@mui/icons-material'
import {
  Alert,
  createTheme,
  Grid,
  IconButton,
  Stack,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useState } from 'react'
import { Layout } from '../components/Layout'
import { Calc } from '../components/scores/Calc'
import { Disabled } from '../components/scores/Placeholder'
import { Filter } from '../components/scores/Filter'
import { List } from '../components/scores/List'
import { Plan } from '../components/scores/Plan'
import { scoresAtom, scoresViewAtom } from '../contexts/bridge/scores'
import { Status } from '../components/scores/Status'
import { ColumnsType } from '../configs/scores/columns'
import { useMount } from 'react-use'

export const ScoresPage = () => {
  const scores = useAtomValue(scoresAtom)
  const scoresView = useAtomValue(scoresViewAtom)
  const [changed, setChanged] = useState(false)

  useMount(() => window.localStorage.getItem('scores-view') && setChanged(true))

  const theme = useTheme()
  const { palette, breakpoints } = theme
  const isMobile = useMediaQuery(breakpoints.down('md'))

  const scoresTheme = createTheme({
    ...theme,
    palette: { ...palette, primary: green },
  })

  return (
    <ThemeProvider theme={scoresTheme}>
      <Layout
        title="成绩"
        subtitle="查看自己的课程成绩"
        icon={InsertChartRounded}
      >
        {scores && scores.scores.length !== 0 && <Filter />}
        <Grid
          container
          spacing={2}
          sx={{
            flexDirection: {
              xs: 'column-reverse',
              sm: 'row',
            },
          }}
        >
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <Stack spacing={2}>
              <Calc />

              {scores ? (
                <Fragment>
                  {scores.scores.length !== 0 && <Plan />}
                  <Status />
                </Fragment>
              ) : (
                <Disabled />
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Stack spacing={2}>
              {isMobile && (!changed || scoresView.simple) && <Tips />}
              <List />
            </Stack>
          </Grid>
        </Grid>
      </Layout>
    </ThemeProvider>
  )
}

const Tips = () => {
  const [scoresView, setScoresView] = useAtom(scoresViewAtom)
  const [columns, setColumns] = useState<ColumnsType[]>([
    'name',
    'type',
    'credit',
    'nature',
    'score',
  ])

  const handleClick = () => {
    if (scoresView.simple) {
      setScoresView({ ...scoresView, columns, simple: false })
      setColumns([])
    } else {
      setColumns(scoresView.columns)
      setScoresView({ ...scoresView, columns: ['name', 'score'], simple: true })
    }
  }

  return (
    <Alert
      severity={scoresView.simple ? 'success' : 'info'}
      variant="filled"
      color="success"
      action={
        <IconButton
          aria-label={scoresView.simple ? '还原' : '切换'}
          size="small"
          color="inherit"
          onClick={handleClick}
          sx={{ my: -0.5 }}
        >
          {scoresView.simple ? <RestartAltOutlined /> : <CheckOutlined />}
        </IconButton>
      }
    >
      {scoresView.simple
        ? '已切换到精简模式，可以随时点击右侧按钮还原，或者点击下方小眼睛按钮自定义表格列。'
        : '检测到你的屏幕比较小，查看成绩较为不便，是否切换到精简模式，只显示课程名称和成绩？'}
    </Alert>
  )
}
