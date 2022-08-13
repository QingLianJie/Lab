import { ForumRounded } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { useAtomValue } from 'jotai'
import { Fragment, useMemo } from 'react'
import useSWR from 'swr'
import { prefix } from '../../configs/site-info'
import { settingsAtom } from '../../contexts/settings'
import { type TrendsCourseComments } from '../../index.d'
import { fetcher } from '../../utils/addons'
import {
  courseCommentResponseMap,
  type CourseCommentResponse,
} from '../../utils/maps'
import { ErrorCard } from '../base/Placeholder'
import { HomeTrendsCourse } from './trends/Course'

export const HomeTrends = () => {
  const settings = useAtomValue(settingsAtom)

  const { data } = useSWR<CourseCommentResponse[]>(
    `${settings.developer.api || prefix}/api/recent/comments`,
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
        <ErrorCard
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
