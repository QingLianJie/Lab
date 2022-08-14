import { TagOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { prefix } from '../../../configs/site-info'
import { accountAtom, settingsAtom } from '../../../contexts/settings'
import { type Comment } from '../../../index.d'
import { relativeTime } from '../../../utils/format'
import { Tooltip } from '../../base/styled/Tooltip'

interface HomeTrendsCourseCommentProps {
  comment: Comment
}

export const HomeTrendsCourseComment = ({
  comment,
}: HomeTrendsCourseCommentProps) => {
  const account = useAtomValue(accountAtom)
  const settings = useAtomValue(settingsAtom)

  return (
    <ListItem disablePadding sx={{ px: 2, py: 0.75 }}>
      <ListItemAvatar sx={{ minWidth: 54 }}>
        <Tooltip
          title={
            account && comment.user.self
              ? `${comment.user.name} (我)`
              : comment.user.name || '<没有名字>'
          }
          arrow
          placement="top"
        >
          <Box
            sx={{
              width: 'fit-content',
              border: 1,
              borderColor: 'divider',
              borderRadius: '50%',
            }}
          >
            <Avatar
              src={
                comment.user.avatar
                  ? `${settings.developer.api || prefix}${comment.user.avatar}`
                  : undefined
              }
              alt={comment.user.name}
              sx={{
                backgroundColor: 'background.subtle',
                width: 36,
                height: 36,
              }}
            >
              {comment.user.anonymous ? (
                <TagOutlined
                  sx={{ color: 'text.disabled', width: 22, height: 22 }}
                />
              ) : (
                <Typography
                  sx={{
                    color: 'text.disabled',
                    fontSize: 'body1.fontSize',
                    fontWeight: 700,
                  }}
                >
                  {comment.user.name.slice(0, 1)}
                </Typography>
              )}
            </Avatar>
          </Box>
        </Tooltip>
      </ListItemAvatar>

      <Stack direction="row" sx={{ width: '100%', alignItems: 'center' }}>
        <Typography
          sx={{
            width: 'fit-content',
            display: 'inline-block',
            flex: 1,
            wordBreak: 'break-all',
            verticalAlign: 'center',
          }}
        >
          <Typography variant="body1" component="span" sx={{ mr: 1.5 }}>
            {comment.content}
          </Typography>
          <Typography
            variant="body2"
            component="time"
            sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
          >
            {relativeTime(comment.date)}
          </Typography>
        </Typography>
      </Stack>
    </ListItem>
  )
}
