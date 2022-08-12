import {
  SendOutlined,
  FilterAltOutlined,
  SmsOutlined,
  AccountCircleOutlined,
} from '@mui/icons-material'
import {
  Button,
  CardActionArea,
  Icon,
  IconButton,
  InputAdornment,
  InputBase,
  Stack,
  Typography,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { type TrendsCommentCourse } from '../../../index.d'
import { accountAtom } from '../../../contexts/settings'
import { Tooltip } from '../../base/styled/Tooltip'
import { useState } from 'react'
import ky, { HTTPError } from 'ky'
import { enqueueSnackbar } from 'notistack'
import { mutate } from 'swr'
import { prefix } from '../../../configs/site-info'
import { LoadingButton } from '@mui/lab'

interface HomeTrendsSendCommentProps {
  course: TrendsCommentCourse
}

export const HomeTrendsSendComment = ({
  course,
}: HomeTrendsSendCommentProps) => {
  const account = useAtomValue(accountAtom)
  const [comment, setComment] = useState('')
  const [isAnonymosus, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendComment = () => {
    if (!comment) return
    setLoading(true)

    ky.post(`${prefix}/api/course/${course.id}/comments`, {
      json: {
        content: comment,
        anonymous: isAnonymosus,
        show: false,
      },
      credentials: 'include',
    })
      .then(() => {
        enqueueSnackbar('发布评论成功')
        setLoading(false)
        setComment('')
        mutate(`${prefix}/api/recent/comments`)
        if (account) mutate(`${prefix}/api/profile/${account.name}`)
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

  return account ? (
    <Stack direction="row" sx={{ px: 1 }}>
      <InputBase
        placeholder="发布课程评论"
        inputProps={{ 'aria-label': '发布课程评论' }}
        autoComplete="off"
        value={comment}
        multiline
        onChange={e => setComment(e.target.value)}
        sx={{
          ml: 0.75,
          mr: 0,
          flex: 1,
          py: 1.5,
          '&:hover svg': { color: 'text.secondary' },
          fontSize: '0.925rem',
        }}
        startAdornment={
          <InputAdornment position="start" sx={{ ml: -0.5, mr: 1 }}>
            <Tooltip
              title={
                isAnonymosus
                  ? `点击切换为 ${account.name}`
                  : '点击切换为 匿名 身份'
              }
              arrow
              placement="top"
            >
              <LoadingButton
                color="primary"
                loading={loading}
                onClick={() => setAnonymous(anonymous => !anonymous)}
                sx={{ fontSize: '0.925rem', fontWeight: 700 }}
              >
                {isAnonymosus ? '匿名' : account.name}
              </LoadingButton>
            </Tooltip>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end" sx={{ ml: 1.5 }}>
            <Tooltip title="发布评论" arrow placement="top">
              <IconButton
                aria-label="发布评论"
                onClick={handleSendComment}
                sx={{
                  cursor: comment.length === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                <SendOutlined
                  fontSize="small"
                  sx={{ color: 'text.disabled', transition: 'all 0.2s' }}
                />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
      />
    </Stack>
  ) : (
    <CardActionArea sx={{ pl: 2.25, pr: 2.25, py: 1.5 }}>
      <Stack
        direction="row"
        spacing={2.5}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          登录清廉街账号后添加评论
        </Typography>
        <SmsOutlined sx={{ color: 'text.disabled', width: 20, height: 20 }} />
      </Stack>
    </CardActionArea>
  )
}
