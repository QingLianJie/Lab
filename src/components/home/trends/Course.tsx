import {
  AccessTimeOutlined,
  ArrowForwardOutlined,
  ExpandMoreOutlined,
  InsertChartOutlined,
  SmsOutlined,
} from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  Collapse,
  Divider,
  List,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Comment, type CommentCourse } from '../../..'
import { HomeTrendsCommentStatistics } from './Statistics'
import { HomeTrendsCourseComment } from './Comment'
import { HomeTrendsSendComment } from './SendComment'
import { TransitionGroup } from 'react-transition-group'

interface HomeTrendsCourse {
  course: CommentCourse
  comments: Comment[]
}

export const HomeTrendsCourse = ({ course, comments }: HomeTrendsCourse) => {
  const navigate = useNavigate()
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))

  const hotLen = 4
  const isHot = comments.length > hotLen
  const [open, setOpen] = useState(false)

  return (
    <Card variant="outlined" sx={{ position: 'relative' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider
            orientation={isMobile ? 'horizontal' : 'vertical'}
            sx={{ height: 'auto' }}
          />
        }
      >
        <CardActionArea
          onClick={() =>
            navigate(`/courses/${course.id}`, { state: { title: course.name } })
          }
          sx={{ position: 'relative', maxWidth: { xs: 'unset', md: 160 } }}
        >
          <Stack
            sx={{
              overflow: 'hidden',
              justifyContent: 'flex-start',
              height: '100%',
            }}
          >
            <Stack
              direction={{ xs: 'row', md: 'column' }}
              spacing={{ xs: 1.5, md: 0.5 }}
              sx={{
                px: 2.25,
                pt: 2,
                pb: { xs: 0.5, md: 2 },
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  pb: { xs: 0, md: 1 },

                  flex: { xs: 1, md: 'unset' },
                }}
              >
                {course.name}
              </Typography>

              <Stack
                direction="row"
                spacing={1.25}
                sx={{
                  alignItems: { xs: 'center', md: 'flex-start' },
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {course.type}
                </Typography>

                <Stack
                  direction="row"
                  sx={{ alignItems: 'center' }}
                  spacing={0.5}
                >
                  <InsertChartOutlined
                    sx={{ width: 16, height: 16, color: 'text.disabled' }}
                  />

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {course.credit}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  sx={{ alignItems: 'center' }}
                  spacing={0.5}
                >
                  <AccessTimeOutlined
                    sx={{ width: 16, height: 16, color: 'text.disabled' }}
                  />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {course.period}
                  </Typography>
                </Stack>
              </Stack>

              {!isMobile && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {course.nature}
                </Typography>
              )}
            </Stack>

            {!isMobile && <Divider />}
            <HomeTrendsCommentStatistics course={course} />
            {!isMobile && (
              <Fragment>
                <Divider sx={{ flex: 1 }} />
                <Stack
                  direction="row"
                  spacing={2.5}
                  sx={{
                    pl: 2.25,
                    pr: 2,
                    py: 1.5,
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {course.count} 人学过
                  </Typography>

                  <ArrowForwardOutlined
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </Stack>
              </Fragment>
            )}
          </Stack>
        </CardActionArea>

        <Stack sx={{ width: '100%' }}>
          <HomeTrendsSendComment course={course} />
          <Divider />
          <List dense sx={{ px: 0, py: 1 }}>
            <TransitionGroup>
              {comments
                .sort((a, b) => b.id - a.id)
                .slice(0, hotLen)
                .map(comment => (
                  <Collapse key={comment.id}>
                    <HomeTrendsCourseComment comment={comment} />
                  </Collapse>
                ))}
            </TransitionGroup>

            {isHot && (
              <Collapse in={open}>
                {comments
                  .sort((a, b) => b.id - a.id)
                  .slice(hotLen)
                  .map(comment => (
                    <HomeTrendsCourseComment
                      comment={comment}
                      key={comment.id}
                    />
                  ))}
                {!isMobile && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.disabled',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      px: 2.25,
                      py: 1.5,
                      mb: 2,
                      flex: 1,
                    }}
                  >
                    更多评论可以去课程页面查看
                  </Typography>
                )}
              </Collapse>
            )}
          </List>

          {isHot ? (
            <Fragment>
              <Divider sx={{ flex: 1 }} />
              <CardActionArea onClick={() => setOpen(open => !open)}>
                <Stack
                  sx={{
                    width: '100%',
                    py: 0.25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ExpandMoreOutlined
                    sx={{
                      color: 'text.disabled',
                      width: 20,
                      height: 20,
                      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </Stack>
              </CardActionArea>
            </Fragment>
          ) : (
            !isMobile && (
              <Fragment>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.disabled',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    px: 2.25,
                    pt: 1.5,
                    pb:
                      comments.length === 1
                        ? 6.5
                        : comments.length === 2
                        ? 5.5
                        : comments.length === 3
                        ? 4.5
                        : 1.5,
                    flex: 1,
                  }}
                >
                  更多评论可以去课程页面查看
                </Typography>
              </Fragment>
            )
          )}
        </Stack>
      </Stack>
    </Card>
  )
}
