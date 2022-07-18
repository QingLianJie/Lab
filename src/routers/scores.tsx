import { InsertChartRounded } from '@mui/icons-material'
import {
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { Layout } from '../components/Layout'
import { Filter } from '../components/scores/Filter'
import { Stats } from '../components/scores/Stats'
import { Proposal } from '../components/scores/Proposal'
import { List } from '../components/scores/List'

export const ScoresPage = () => {
  const theme = useTheme()
  const { palette, breakpoints } = theme
  const isMobile = useMediaQuery(breakpoints.down('sm'))

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <Stack spacing={2}>
              <Stats />
              <Filter />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Stack spacing={2}>
              <List />
              <Proposal />
            </Stack>
          </Grid>
        </Grid>
      </Layout>
    </ThemeProvider>
  )
}
