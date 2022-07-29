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
import { useAtomValue } from 'jotai'
import { Fragment, useState } from 'react'
import { useMount } from 'react-use'
import { Layout } from '../components/Layout'
import { Calc } from '../components/scores/Calc'
import { Filter } from '../components/scores/Filter'
import { List } from '../components/scores/List'
import { Disabled } from '../components/scores/Placeholder'
import { Plan } from '../components/scores/Plan'
import { Status } from '../components/scores/Status'
import { SimpleTips, UploadTips } from '../components/scores/Tips'
import { scoresAtom, scoresViewAtom } from '../contexts/bridge/scores'

export const ScoresPage = () => {
  const scores = useAtomValue(scoresAtom)
  const scoresView = useAtomValue(scoresViewAtom)
  const [changed, setChanged] = useState(false)

  useMount(() => window.localStorage.getItem('scores-view') && setChanged(true))

  const theme = useTheme()
  const { palette, breakpoints } = theme
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const isPad = useMediaQuery(breakpoints.down('md'))

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
        color={green[400]}
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
                  {isMobile && <UploadTips />}
                </Fragment>
              ) : (
                <Disabled />
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Stack spacing={2}>
              {scores && isPad && (!changed || scoresView.simple) && (
                <SimpleTips />
              )}
              <List />
              {scores && !isMobile && <UploadTips />}
            </Stack>
          </Grid>
        </Grid>
      </Layout>
    </ThemeProvider>
  )
}
