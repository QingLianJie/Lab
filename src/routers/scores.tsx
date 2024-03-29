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
import { green, pink } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { Fragment, useState, useEffect } from 'react'
import { useMount } from 'react-use'
import { Layout } from '../components/Layout'
import { ScoresCalc } from '../components/scores/Calc'
import { ScoresFilterModal } from '../components/scores/Filter'
import { ScoresList } from '../components/scores/List'
import { ScoresDisabled } from '../components/scores/Placeholder'
import { ScoresPlan } from '../components/scores/Plan'
import { ScoresStatus } from '../components/scores/Status'
import { ScoresSimpleTips } from '../components/scores/Tips'
import { SettingsFetch } from '../components/settings/Fetch'
import { scoresAtom, scoresViewAtom } from '../contexts/scores'

export const ScoresPage = () => {
  const scores = useAtomValue(scoresAtom)
  const scoresView = useAtomValue(scoresViewAtom)
  const [changed, setChanged] = useState(false)

  useMount(() => localStorage.getItem('scores-view') && setChanged(true))
  useEffect(() => {
    if (scoresView.pin) document.documentElement.style.overflowY = 'unset'
    else document.documentElement.style.overflowY = 'overlay'
  }, [scoresView.pin])

  const theme = useTheme()
  const { palette, breakpoints } = theme
  const isDark = palette.mode === 'dark'
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const isPad = useMediaQuery(breakpoints.down('md'))

  const scoresTheme = createTheme({
    ...theme,
    palette: {
      ...palette,
      primary: green,
      secondary: isDark ? { main: '#ec407a' } : pink,
    },
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
            <ScoresFilterModal />
            <Grid
              container
              spacing={2}
              sx={{
                position: 'relative',
                flex: 1,
                flexDirection: { xs: 'column-reverse', sm: 'row' },
              }}
            >
              <Grid item xs={12} sm={5} md={4} lg={3}>
                <Stack
                  spacing={2}
                  sx={{
                    position: scoresView.pin ? 'sticky' : 'relative',
                    top: scoresView.pin ? 16 : 0,
                  }}
                >
                  <ScoresCalc />

                  {scores ? (
                    <Fragment>
                      {scores.scores.length !== 0 && <ScoresPlan />}
                      <ScoresStatus />
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
