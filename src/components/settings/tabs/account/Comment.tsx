import { DeleteOutlined, TagOutlined } from '@mui/icons-material'
import {
  ListItem,
  ListItemAvatar,
  Box,
  Avatar,
  Typography,
  Stack,
  ListItemButton,
  IconButton,
} from '@mui/material'
import { type UserProfileComment } from '../../../../index.d'
import { Tooltip } from '../../../base/styled/Tooltip'
import { relativeTime } from '../../../../utils/format'
import { red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import ky, { HTTPError } from 'ky'
import { enqueueSnackbar } from 'notistack'
import { mutate } from 'swr'
import { prefix } from '../../../../configs/site-info'
import { accountAtom, settingsAtom } from '../../../../contexts/settings'

interface SettingsAccountCommentProps {
  comment: UserProfileComment
}

export const SettingsAccountComment = ({
  comment,
}: SettingsAccountCommentProps) => {
  const navigate = useNavigate()
  const settings = useAtomValue(settingsAtom)
  const account = useAtomValue(accountAtom)

  const handleRemove = () => {
    const ans = confirm(`确定要删除这个评论吗？`)
    if (!ans) return

    ky.delete(`${settings.developer.api || prefix}/api/comment/${comment.id}`, {
      credentials: 'include',
    })
      .then(() => {
        enqueueSnackbar('删除成功')
        mutate(
          `${settings.developer.api || prefix}/api/profile/${
            account ? account.name : ''
          }`
        )
        mutate(`${settings.developer.api || prefix}/api/recent/comments`)
      })
      .catch((error: HTTPError) => {
        console.error(error)
        error.response
          .json()
          .then((messages: { [key: string]: string }) =>
            Object.values(messages).forEach((message: string) =>
              enqueueSnackbar(`删除失败 - ${message}`)
            )
          )
      })
  }

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Tooltip title="删除这个评论" arrow placement="top">
          <IconButton
            aria-label="删除这个评论"
            edge="end"
            onClick={handleRemove}
            sx={{ right: '2.5px' }}
          >
            <DeleteOutlined sx={{ color: red[500], width: 24, height: 24 }} />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemButton
        sx={{ px: 2, py: 0.75 }}
        onClick={() =>
          navigate(`/courses/${comment.course.id}`, {
            state: { title: comment.course.name },
          })
        }
      >
        <ListItemAvatar sx={{ minWidth: 54 }}>
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
                src={
                  comment.user.avatar
                    ? `${settings.developer.api || prefix}${
                        comment.user.avatar
                      }`
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

        <Stack
          spacing={0.25}
          direction="row"
          sx={{ width: '100%', alignItems: 'center' }}
        >
          <Typography
            sx={{
              width: 'fit-content',
              display: 'inline-block',
              flex: 1,
              wordBreak: 'break-all',
              verticalAlign: 'center',
            }}
          >
            <Typography
              variant="body1"
              component="span"
              sx={{ mr: 1.5, wordBreak: 'break-all' }}
            >
              {comment.content}
            </Typography>

            <Typography
              variant="body2"
              component="span"
              sx={{ mr: 1.5, fontWeight: 700, color: 'text.secondary' }}
            >
              {comment.course.name}
            </Typography>

            <Typography
              variant="body2"
              component="time"
              sx={{ color: 'text.secondary' }}
            >
              {relativeTime(comment.date)}
            </Typography>
          </Typography>
        </Stack>
      </ListItemButton>
    </ListItem>
  )
}
