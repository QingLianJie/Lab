import { InsertChartRounded } from '@mui/icons-material'
import {
  Card,
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
import { ScoresCalc } from '../components/scores/Calc'
import { ScoresFilter } from '../components/scores/Filter'
import { ScoresList } from '../components/scores/List'
import { ScoresDisabled } from '../components/scores/Placeholder'
import { ScoresPlan } from '../components/scores/Plan'
import { ScoresStatus } from '../components/scores/Status'
import { ScoresSimpleTips, ScoresUploadTips } from '../components/scores/Tips'
import { SettingsFetch } from '../components/settings/Fetch'
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
        {scores && scores.scores.length !== 0 ? (
          <Fragment>
            <ScoresFilter />
            <Grid
              container
              spacing={2}
              sx={{
                flex: 1,
                flexDirection: {
                  xs: 'column-reverse',
                  sm: 'row',
                },
              }}
            >
              <Grid item xs={12} sm={5} md={4} lg={3}>
                <Stack spacing={2}>
                  <ScoresCalc />

                  {scores ? (
                    <Fragment>
                      {scores.scores.length !== 0 && <ScoresPlan />}
                      <ScoresStatus />
                      {isMobile && <ScoresUploadTips />}
                    </Fragment>
                  ) : (
                    <ScoresDisabled />
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={7} md={8} lg={9}>
                <Stack spacing={2} sx={{ flex: 1, height: '100%' }}>
                  {scores && isPad && (!changed || scoresView.simple) && (
                    <ScoresSimpleTips />
                  )}
                  <ScoresList />
                  {scores && !isMobile && <ScoresUploadTips />}
                </Stack>
              </Grid>
            </Grid>
          </Fragment>
        ) : (
          <Card
            variant="outlined"
            sx={{ flex: 1, display: 'flex', alignItems: 'center' }}
          >
            <SettingsFetch name="成绩" icon={InsertChartRounded} />
          </Card>
        )}
      </Layout>
    </ThemeProvider>
  )
}
