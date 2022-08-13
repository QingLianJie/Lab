import { ClassRounded } from '@mui/icons-material'
import {
  CircularProgress,
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material'
import { red, pink } from '@mui/material/colors'
import { Fragment, Suspense, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { Layout } from '../../components/Layout'
import { prefix } from '../../configs/site-info'
import { fetcher } from '../../utils/addons'
import {
  type CourseDetailsResponse,
  courseDetailsResponseMap,
} from '../../utils/maps'
import { type CourseDetails as CourseDetailsType } from '../../index.d'
import { CourseDetailsInfo } from '../../components/courses/details/Info'
import { useAtomValue } from 'jotai'
import { settingsAtom } from '../../contexts/settings'

export const CourseDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const { title } = location.state as { title: string }

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
        title={title || '课程详情'}
        subtitle={id || '筛选和查看课程数据'}
        icon={ClassRounded}
        color={red[400]}
      >
        <ErrorBoundary fallback={<CourseDetailsError />}>
          <Suspense fallback={<CourseDetailsLoading />}>
            <CourseDetails id={id} />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </ThemeProvider>
  )
}

interface CourseDetailsProps {
  id?: string
}

const CourseDetails = ({ id }: CourseDetailsProps) => {
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
    return courseDetailsResponseMap(data)
  }, [data])

  return (
    <Fragment>
      {courseDetails && (
        <Grid container spacing={2} sx={{ flex: 1, height: '100%' }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Stack spacing={2}>
              <CourseDetailsInfo details={courseDetails} />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={8} lg={6}>
            <Stack spacing={2} sx={{ flex: 1, height: '100%' }}></Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Stack spacing={2}></Stack>
          </Grid>
        </Grid>
      )}
    </Fragment>
  )
}

export const CourseDetailsLoading = () => (
  <Stack
    sx={{
      flex: 1,
      height: '100%',
      px: 2,
      py: { xs: 12, sm: 8, md: 4 },
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={48} thickness={4} />
  </Stack>
)

interface CourseDetailsErrorProps {
  title?: string
}

const CourseDetailsError = ({ title }: CourseDetailsErrorProps) => (
  <Stack
    sx={{
      flex: 1,
      height: '100%',
      width: '100%',
      px: 2,
      py: { xs: 12, sm: 8, md: 4 },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography sx={{ color: 'text.disabled' }}>
      {title || '获取课程详情出错'}
    </Typography>
  </Stack>
)
