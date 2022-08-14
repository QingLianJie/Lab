import { ClassRounded } from '@mui/icons-material'
import {
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  useTheme,
} from '@mui/material'
import { pink, red } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import {
  Fragment,
  Suspense,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { ErrorCard, LoadingCard } from '../../components/base/Placeholder'
import { CourseDetailsComments } from '../../components/courses/details/comments/Comments'
import { CourseDetailsInfo } from '../../components/courses/details/Info'
import { CourseDetailsStatistics } from '../../components/courses/details/Statistics'
import { Layout } from '../../components/Layout'
import { prefix } from '../../configs/site-info'
import { settingsAtom } from '../../contexts/settings'
import { type CourseDetails as CourseDetailsType } from '../../index.d'
import { fetcher } from '../../utils/addons'
import {
  courseDetailsResponseMap,
  type CourseDetailsResponse,
} from '../../utils/maps'

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

  const { data } = useSWR<CourseDetailsResponse>(
    `${settings.developer.api || prefix}/api/course/${id}`,
    fetcher,
    {
      refreshInterval: 60 * 60 * 1000,
      suspense: true,
      refreshWhenHidden: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  const courseDetails: CourseDetailsType | undefined = useMemo(() => {
    if (!data) return undefined
    const details = courseDetailsResponseMap(data)
    setTitle(details.course.name)
    return details
  }, [data])

  return (
    <Fragment>
      {courseDetails && (
        <Grid container spacing={2} sx={{ flex: 1, height: '100%' }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Stack spacing={2}>
              <CourseDetailsInfo details={courseDetails} />
              <CourseDetailsStatistics details={courseDetails} />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={8} lg={6}>
            <Stack spacing={2} sx={{ flex: 1, height: '100%' }}></Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Stack spacing={2}>
              <CourseDetailsComments details={courseDetails} />
            </Stack>
          </Grid>
        </Grid>
      )}
    </Fragment>
  )
}
