import { InboxRounded } from '@mui/icons-material'
import {
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { pink } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HomeFavorites } from '../components/home/Favorites'
import { HomeSearchBar } from '../components/home/Search'
import { HomeShortcuts } from '../components/home/Shortcuts'
import {
  HomeTrends,
  HomeTrendsError,
  HomeTrendsLoading,
} from '../components/home/Trends'
import { HomeWidgetPlaceholder } from '../components/home/widgets/Placeholder'
import { HomeProfileWidget } from '../components/home/widgets/Profile'
import { HomeStatisticsWidget } from '../components/home/widgets/Statistics'
import { Layout } from '../components/Layout'
import { schedulesAtom } from '../contexts/schedules'
import { scoresAtom } from '../contexts/scores'

export const HomePage = () => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const day = new Date().getDay()
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()

  const scores = useAtomValue(scoresAtom)
  const schedules = useAtomValue(schedulesAtom)

  const theme = useTheme()
  const { palette, breakpoints } = theme
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const isPad = useMediaQuery(breakpoints.between('sm', 'lg'))

  const homeTheme = createTheme({
    ...theme,
    palette: { ...palette, primary: pink },
  })

  return (
    <ThemeProvider theme={homeTheme}>
      <Layout
        subtitle={`今天是 ${month} 月 ${date} 日，${weekdays[day]}`}
        icon={InboxRounded}
        color={pink[400]}
      >
        <Grid container spacing={2} sx={{ flex: 1, height: '100%' }}>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <Stack spacing={2}>
              {isMobile && <HomeSearchBar />}
              <HomeShortcuts />
              <HomeFavorites />

              {isPad && (
                <Fragment>
                  {scores && schedules ? (
                    <HomeStatisticsWidget />
                  ) : (
                    <HomeWidgetPlaceholder />
                  )}
                  <HomeProfileWidget />
                </Fragment>
              )}
            </Stack>
          </Grid>

          {!isMobile && (
            <Grid item xs={12} sm={7} md={8} lg={6}>
              <Stack spacing={2} sx={{ flex: 1, height: '100%' }}>
                <HomeSearchBar />
                <ErrorBoundary fallback={<HomeTrendsError />}>
                  <Suspense fallback={<HomeTrendsLoading />}>
                    <HomeTrends />
                  </Suspense>
                </ErrorBoundary>
              </Stack>
            </Grid>
          )}
          {!isPad && (
            <Grid item xs={12} sm={5} md={4} lg={3}>
              <Stack spacing={2}>
                {scores && schedules ? (
                  <HomeStatisticsWidget />
                ) : (
                  <HomeWidgetPlaceholder />
                )}
                <HomeProfileWidget />
                {isMobile && <HomeTrends />}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Layout>
    </ThemeProvider>
  )
}
