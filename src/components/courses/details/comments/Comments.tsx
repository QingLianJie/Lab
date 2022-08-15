import { HelpOutlineOutlined, SendOutlined } from '@mui/icons-material'
import {
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import ky, { type HTTPError } from 'ky'
import { enqueueSnackbar } from 'notistack'
import { Fragment, useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { mutate } from 'swr'
import { type Comment } from '../../../..'
import { prefix } from '../../../../configs/site-info'
import { accountAtom, settingsAtom } from '../../../../contexts/settings'
import { courseDetailsAtom } from '../../../../routers/courses/[id]'
import { relativeTime } from '../../../../utils/format'
import { Tooltip } from '../../../base/styled/Tooltip'
import { ProfileLogin } from '../../../home/widgets/Profile'
import { CourseDetailsMoreComments } from './MoreComments'

export const CourseDetailsComments = () => {
  const settings = useAtomValue(settingsAtom)
  const account = useAtomValue(accountAtom)
  const courseDetails = useAtomValue(courseDetailsAtom)

  const [comment, setComment] = useState('')
  const [isAnonymosus, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)

  const recentComments = courseDetails
    ? courseDetails.comments
        .find(comment => comment.name === '清廉街')
        ?.comments.slice(0, 4) || []
    : []

  const fubaijieComments = courseDetails
    ? courseDetails.comments.find(comment => comment.name === '腐败街')
        ?.comments.length || 0
    : 0

  const handleSendComment = () => {
    if (!comment || !courseDetails) return
    setLoading(true)

    ky.post(
      `${settings.developer.api || prefix}/api/course/${
        courseDetails.course.id
      }/comments`,
      {
        json: {
          content: comment,
          anonymous: isAnonymosus,
          show: false,
        },
        credentials: 'include',
      }
    )
      .then(() => {
        enqueueSnackbar('发布评论成功')
        setLoading(false)
        setComment('')
        mutate(`${settings.developer.api || prefix}/api/recent/comments`)
        mutate(
          `${settings.developer.api || prefix}/api/course/${
            courseDetails.course.id
          }`
        )
        if (account)
          mutate(
            `${settings.developer.api || prefix}/api/profile/${account.name}`
          )
      })
      .catch((error: HTTPError) => {
        console.error(error)
        setLoading(false)
        error.response
          .json()
          .then((messages: { [key: string]: string }) =>
            Object.values(messages).forEach((message: string) =>
              enqueueSnackbar(`发布评论失败 - ${message}`)
            )
          )
      })
  }

  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        {account ? (
          <Stack>
            <InputBase
              placeholder="输入课程评论"
              inputProps={{
                'aria-label': '发布课程评论',
                component: TextareaAutosize,
              }}
              disabled={loading}
              autoComplete="off"
              multiline
              minRows={2}
              defaultValue={comment}
              size="small"
              onChange={e => setComment(e.target.value)}
              sx={{ px: 2.25, py: 2 }}
            />
            <Stack
              direction="row"
              sx={{
                px: 0.75,
                py: 0.75,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Tooltip
                title={
                  isAnonymosus
                    ? `点击切换为 ${account.name}`
                    : '点击切换为 匿名 身份'
                }
                arrow
                placement="top"
              >
                <Button
                  color="primary"
                  disabled={loading}
                  onClick={() => setAnonymous(anonymous => !anonymous)}
                  sx={{ fontSize: '0.925rem', fontWeight: 700 }}
                >
                  {loading
                    ? '发布中 ...'
                    : isAnonymosus
                    ? '匿名'
                    : account.name}
                </Button>
              </Tooltip>

              <Tooltip title="发布评论" arrow placement="top">
                <IconButton
                  aria-label="发布评论"
                  onClick={handleSendComment}
                  sx={{
                    cursor:
                      loading || comment.length === 0
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                >
                  <SendOutlined
                    fontSize="small"
                    sx={{ color: 'text.disabled', transition: 'all 0.2s' }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        ) : (
          <ProfileLogin />
        )}
      </Card>
      <Card variant="outlined" sx={{ position: 'relative' }}>
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            pb: 0,
            px: 2.25,
            pt: 2,
          }}
        >
          最近评论
        </Typography>

        {recentComments.length === 0 ? (
          <Stack
            spacing={0.5}
            sx={{
              width: '100%',
              alignItems: 'center',
              pt: 4,
              pb: 6,
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.disabled' }}>
              没有最近评论
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.disabled', textAlign: 'center' }}
            >
              {fubaijieComments === 0
                ? '欢迎来说说你的看法'
                : '可查看腐败街历史评论'}
            </Typography>
          </Stack>
        ) : (
          <List dense sx={{ py: 1 }}>
            <TransitionGroup>
              {recentComments?.map(comment => (
                <Collapse key={comment.id}>
                  <DetailsComment comment={comment} />
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        )}
        {(recentComments.length !== 0 || fubaijieComments !== 0) && (
          <Fragment>
            <Divider />
            <CourseDetailsMoreComments />
          </Fragment>
        )}

        <Tooltip title="了解更多" arrow placement="top">
          <IconButton
            aria-label="了解更多"
            sx={{
              position: 'absolute',
              right: 5,
              top: 8,
              color: 'text.disabled',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s',
            }}
          >
            <HelpOutlineOutlined sx={{ width: 24, height: 24 }} />
          </IconButton>
        </Tooltip>
      </Card>
    </Stack>
  )
}

interface DetailsCommentProps {
  comment: Comment
}

const DetailsComment = ({ comment }: DetailsCommentProps) => (
  <ListItem disablePadding sx={{ px: 2.25, py: 0.75 }}>
    <Stack spacing={0.5} sx={{ width: '100%', alignItems: 'flex-start' }}>
      <Stack direction="row" spacing={1}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: 'text.secondary',
            whiteSpace: 'nowrap',
          }}
        >
          {comment.user.name}
        </Typography>
        <Typography
          variant="body2"
          component="time"
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {relativeTime(comment.date)}
        </Typography>
      </Stack>
      <Typography variant="body1" component="span" sx={{ mr: 1.5 }}>
        {comment.content}
      </Typography>
    </Stack>
  </ListItem>
)
