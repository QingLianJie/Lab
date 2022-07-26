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
import { Layout } from '../components/Layout'
import { Calc } from '../components/scores/Calc'
import { Disabled } from '../components/scores/Placeholder'
import { Filter } from '../components/scores/Filter'
import { List } from '../components/scores/List'
import { Plan } from '../components/scores/Plan'
import { scoresAtom } from '../contexts/bridge/scores'
import { Status } from '../components/scores/Status'

export const ScoresPage = () => {
  const scores = useAtomValue(scoresAtom)

  const theme = useTheme()
  const { palette } = theme

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
              <List />
            </Stack>
          </Grid>
        </Grid>
      </Layout>
    </ThemeProvider>
  )
}
