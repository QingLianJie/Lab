import { HelpOutlineOutlined } from '@mui/icons-material'
import {
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { type Comment, type CourseDetails } from '../../../..'
import { accountAtom } from '../../../../contexts/settings'
import { relativeTime } from '../../../../utils/format'
import { Tooltip } from '../../../base/styled/Tooltip'
import { ProfileLogin } from '../../../home/widgets/Profile'
import { CourseDetailsMoreComments } from './MoreComments'

interface CourseDetailsCommentsProps {
  details: CourseDetails
}

export const CourseDetailsComments = ({
  details,
}: CourseDetailsCommentsProps) => {
  const account = useAtomValue(accountAtom)

  const recentComments =
    details.comments
      .find(comment => comment.name === '清廉街')
      ?.comments.slice(0, 4) || []

  const fubaijieComments =
    details.comments.find(comment => comment.name === '腐败街')?.comments
      .length || 0

  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        {account ? <Fragment /> : <ProfileLogin />}
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
            {recentComments?.map(comment => (
              <DetailsComment comment={comment} key={comment.id} />
            ))}
          </List>
        )}
        {(recentComments.length !== 0 || fubaijieComments !== 0) && (
          <Fragment>
            <Divider />
            <CourseDetailsMoreComments details={details} />
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
  <ListItem disablePadding sx={{ px: 2.25, py: 1 }}>
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
