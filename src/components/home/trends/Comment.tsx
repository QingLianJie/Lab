import {
  ArrowForwardOutlined,
  ExpandMoreOutlined,
  SmsOutlined,
} from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  Chip,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material'
import { green, red } from '@mui/material/colors'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type TrendsComment, type TrendsCommentCourse } from '../../../index.d'
import { Tooltip } from '../../base/styled/Tooltip'
import { HomeTrendsCommentMessage } from './Message'

interface HomeTrendsComment {
  course: TrendsCommentCourse
  comments: TrendsComment[]
}

export const HomeTrendsComment = ({ course, comments }: HomeTrendsComment) => {
  const navigate = useNavigate()
  const isHot = comments.length > 4
  const [open, setOpen] = useState(false)

  return (
    <Card variant="outlined" sx={{ position: 'relative' }}>
      <Tooltip title="添加评论" arrow placement="top">
        <IconButton
          aria-label="添加评论"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 20,
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
        >
          <SmsOutlined sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Tooltip>

      <CardActionArea
        onClick={() => navigate(`/courses/${course.id}`)}
        sx={{ position: 'relative' }}
      >
        <Stack sx={{ px: 2.25, py: 2 }} spacing={0.75}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Chip
              label={isHot ? '热议' : '最近'}
              size="small"
              color={isHot ? 'primary' : 'default'}
              sx={{
                fontSize: 'caption.fontSize',
                fontWeight: 700,
                height: 'auto',
                px: 0,
                py: 0.1,
                ml: -0.125,
              }}
            />

            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {course.name}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {course.type}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {course.credit} 学分
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {course.period} 学时
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {course.nature}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: green[400] }}
            >
              优秀 00.0%
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: red[400], flex: 1 }}
            >
              挂科 00.0%
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {course.count} 人学过
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>

      <Divider />
      <List dense sx={{ px: 0, py: 1 }}>
        {comments
          .sort((a, b) => b.id - a.id)
          .slice(0, 4)
          .map(comment => (
            <HomeTrendsCommentMessage comment={comment} key={comment.id} />
          ))}

        {isHot && (
          <Collapse in={open}>
            {comments
              .sort((a, b) => b.id - a.id)
              .slice(4)
              .map(comment => (
                <HomeTrendsCommentMessage comment={comment} key={comment.id} />
              ))}
          </Collapse>
        )}
      </List>

      {isHot && (
        <Fragment>
          <Divider />
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
      )}
    </Card>
  )
}
