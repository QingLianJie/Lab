import { ClassRounded } from '@mui/icons-material'
import {
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { pink, red } from '@mui/material/colors'
import { atom, useAtom, useAtomValue } from 'jotai'
import {
  Fragment,
  Suspense,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { ErrorCard, LoadingCard } from '../../components/base/Placeholder'
import { CourseDetailsBarChart } from '../../components/courses/details/charts/Bar'
import { CourseDetailsStackChart } from '../../components/courses/details/charts/Stack'
import { CourseDetailsComments } from '../../components/courses/details/comments/Comments'
import { CourseDetailsInfo } from '../../components/courses/details/Info'
import { CourseDetailsStatistics } from '../../components/courses/details/Statistics'
import { CourseDetailsToolBar } from '../../components/courses/details/ToolBar'
import { Layout } from '../../components/Layout'
import { prefix } from '../../configs/site-info'
import { settingsAtom } from '../../contexts/settings'
import { type CourseDetails as CourseDetailsType } from '../../index.d'
import { fetcher } from '../../utils/addons'
import {
  courseDetailsResponseMap,
  type CourseDetailsResponse,
} from '../../utils/maps'

type CourseDetailsView = {
  statistics: string
  comments: '清廉街' | '腐败街'
}

export const courseDetailsAtom = atom<CourseDetailsType | false>(false)
export const courseDetailsViewAtom = atom<CourseDetailsView>({
  statistics: '所有时间',
  comments: '清廉街',
})

export const CourseDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const state = location.state as { title: string }
  const [title, setTitle] = useState(state?.title || '课程详情')

  const theme = useTheme()
  const { palette } = theme
  const isDark = palette.mode === 'dark'

  const coursesTheme = createTheme({
    ...theme,
    palette: {
      ...palette,
      primary: red,
      secondary: isDark ? { main: '#ec407a' } : pink,
    },
  })

  return (
    <ThemeProvider theme={coursesTheme}>
      <Layout
        title={title}
        subtitle={id || '筛选和查看课程数据'}
        icon={ClassRounded}
        color={red[400]}
      >
        <ErrorBoundary fallback={<ErrorCard />}>
          <Suspense fallback={<LoadingCard />}>
            <CourseDetails id={id} setTitle={setTitle} />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </ThemeProvider>
  )
}

interface CourseDetailsProps {
  id?: string
  setTitle: Dispatch<SetStateAction<string>>
}

const CourseDetails = ({ id, setTitle }: CourseDetailsProps) => {
  const settings = useAtomValue(settingsAtom)
  const [courseDetails, setCourseDetails] = useAtom(courseDetailsAtom)

  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const isPad = useMediaQuery(breakpoints.between('sm', 'lg'))
  const isDesktop = useMediaQuery(breakpoints.up('lg'))

  const { data } = useSWR<CourseDetailsResponse>(
    `${settings.developer.api || prefix}/api/course/${id}`,
    fetcher
  )

  useEffect(() => {
    if (!data) return
    const details = courseDetailsResponseMap(data)
    setTitle(details.course.name)
    setCourseDetails(details)
  }, [data])

  return (
    <Fragment>
      {courseDetails && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <Stack spacing={2}>
              {isMobile && <CourseDetailsToolBar />}
              <CourseDetailsInfo />
              <CourseDetailsStatistics />
              {isPad && <CourseDetailsComments />}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={7} md={8} lg={6}>
            <Stack spacing={2}>
              {!isMobile && <CourseDetailsToolBar />}

              <CourseDetailsBarChart />
              <CourseDetailsStackChart />
            </Stack>
          </Grid>

          {(isMobile || isDesktop) && (
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <CourseDetailsComments />
            </Grid>
          )}
        </Grid>
      )}
    </Fragment>
  )
}
