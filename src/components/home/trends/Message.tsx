import { TagOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material'
import { type TrendsComment } from '../../../index.d'
import { relativeTime } from '../../../utils/format'
import { Tooltip } from '../../base/styled/Tooltip'

interface HomeTrendsCommentMessageProps {
  comment: TrendsComment
}

export const HomeTrendsCommentMessage = ({
  comment,
}: HomeTrendsCommentMessageProps) => (
  <ListItem disablePadding sx={{ p: 0 }}>
    <ListItemButton sx={{ alignItems: 'flex-start' }}>
      <ListItemAvatar sx={{ minWidth: 44 }}>
        <Tooltip title={comment.user.name} arrow placement="top">
          <Box
            sx={{
              width: 'fit-content',
              border: 1,
              borderColor: 'divider',
              borderRadius: '50%',
            }}
          >
            <Avatar
              src={comment.user.avatar || undefined}
              alt={comment.user.anonymous ? '匿名' : comment.user.name}
              sx={{
                backgroundColor: 'background.subtle',
                width: 28,
                height: 28,
              }}
            >
              {comment.user.anonymous ? (
                <TagOutlined
                  sx={{ color: 'text.disabled', width: 18, height: 18 }}
                />
              ) : (
                <Typography
                  sx={{
                    color: 'text.disabled',
                    fontSize: 'body2.fontSize',
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

      <Stack
        spacing={1}
        direction="row"
        sx={{ width: '100%', alignItems: 'center' }}
      >
        <Typography sx={{ width: 'fit-content', py: 0.25, flex: 1 }}>
          {comment.content}
        </Typography>

        <Typography
          variant="body2"
          component="time"
          sx={{
            color: 'text.secondary',
            whiteSpace: 'nowrap',
          }}
        >
          {relativeTime(comment.date)}
        </Typography>
      </Stack>
    </ListItemButton>
  </ListItem>
)
