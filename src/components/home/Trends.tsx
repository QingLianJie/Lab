import {
  ForumRounded,
  SvgIconComponent,
  WarningRounded,
} from '@mui/icons-material'
import {
  Button,
  Card,
  CircularProgress,
  Icon,
  Stack,
  Typography,
} from '@mui/material'
import { Fragment, useMemo } from 'react'
import useSWR from 'swr'
import { prefix } from '../../configs/site-info'
import { type TrendsCourseComments } from '../../index.d'
import { fetcher } from '../../utils/addons'
import {
  CourseCommentResponse,
  courseCommentResponseMap,
} from '../../utils/maps'
import { HomeTrendsCourse } from './trends/Course'

export const HomeTrends = () => {
  const { data } = useSWR<CourseCommentResponse[]>(
    `${prefix}/api/recent/comments`,
    fetcher,
    {
      refreshInterval: 30 * 60 * 1000,
      suspense: true,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  const groupedComments: TrendsCourseComments = useMemo(() => {
    if (!data) return []
    return data
      .map(comment => courseCommentResponseMap(comment))
      .reduce((pre, cur) => {
        const { course, ...comment } = cur
        const index = pre.findIndex(item => item.course.id === cur.course.id)
        if (index !== -1) pre[index].comments.push(comment)
        else pre.push({ course, comments: [comment] })
        return pre
      }, [] as TrendsCourseComments)
      .sort((a, b) => b.comments.length - a.comments.length)
  }, [data])

  return (
    <Fragment>
      {groupedComments.length === 0 ? (
        <HomeTrendsError
          icon={ForumRounded}
          title="暂时没有内容"
          description="过一会再来这里看看吧"
        />
      ) : (
        <Stack spacing={2}>
          {groupedComments.map(group => (
            <HomeTrendsCourse
              course={group.course}
              comments={group.comments}
              key={group.course.id}
            />
          ))}
        </Stack>
      )}
    </Fragment>
  )
}

interface HomeTrendsErrorProps {
  icon?: SvgIconComponent
  title?: string
  description?: string
}

export const HomeTrendsError = ({
  icon,
  title,
  description,
}: HomeTrendsErrorProps) => (
  <Card variant="outlined" sx={{ px: 2, py: 1.5, flex: 1 }}>
    <Stack
      spacing={0.5}
      sx={{
        flex: 1,
        height: '100%',
        px: { xs: 2.5, md: 3 },
        py: { xs: 8, md: 8 },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon
        component={icon || WarningRounded}
        sx={{
          width: 120,
          height: 120,
          my: 2,
          color: 'action.selected',
          transition: 'color 0.2s',
        }}
      />

      <Typography
        variant="h6"
        component="span"
        sx={{
          color: 'text.primary',
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        {title || '获取数据失败'}
      </Typography>
      <Typography
        variant="body1"
        component="span"
        sx={{ color: 'text.secondary', textAlign: 'center' }}
      >
        {description || '请检查网络，或者稍后再试'}
      </Typography>

      <Stack direction="row" sx={{ py: 1 }}>
        <Button
          variant="text"
          disableElevation
          color="info"
          sx={{
            minWidth: 'unset',
            py: 0.75,
            px: 1.5,
            textTransform: 'none',
          }}
          onClick={() => location.reload()}
        >
          重新加载
        </Button>
      </Stack>
    </Stack>
  </Card>
)

export const HomeTrendsLoading = () => (
  <Card variant="outlined" sx={{ px: 2, py: 1.5, flex: 1 }}>
    <Stack
      spacing={0.5}
      sx={{
        flex: 1,
        height: '100%',
        px: { xs: 2.5, md: 3 },
        py: { xs: 8, md: 8 },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={48} thickness={4} />
    </Stack>
  </Card>
)
