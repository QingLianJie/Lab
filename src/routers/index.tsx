import { InboxRounded } from '@mui/icons-material'
import {
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  useTheme,
} from '@mui/material'
import { pink } from '@mui/material/colors'
import { HomeFavorites } from '../components/home/Favorites'
import { HomeSearchBar } from '../components/home/Search'
import { HomeShortcuts } from '../components/home/Shortcuts'
import { HomeTrends } from '../components/home/Trends'
import { HomeProfileWidget } from '../components/home/widgets/Profile'
import { HomeSchedulesWidget } from '../components/home/widgets/Schedules'
import { HomeScoresWidget } from '../components/home/widgets/Scores'
import { Layout } from '../components/Layout'

export const HomePage = () => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const day = new Date().getDay()
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()

  const theme = useTheme()
  const { palette } = theme

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
          <Grid item xs={12} sm={6} lg={3}>
            <Stack spacing={2}>
              <HomeShortcuts />
              <HomeFavorites />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Stack spacing={2} sx={{ flex: 1, height: '100%' }}>
              <HomeSearchBar />
              <HomeTrends />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Stack spacing={2}>
              <HomeProfileWidget />
              <HomeSchedulesWidget />
              <HomeScoresWidget />
            </Stack>
          </Grid>
        </Grid>
      </Layout>
    </ThemeProvider>
  )
}
