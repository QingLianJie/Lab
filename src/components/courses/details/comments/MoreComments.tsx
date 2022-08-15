import {
  CheckOutlined,
  ExpandMoreOutlined,
  SmsOutlined,
} from '@mui/icons-material'
import {
  Button,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useMemo, useRef, useState } from 'react'
import {
  courseDetailsAtom,
  courseDetailsViewAtom,
} from '../../../../routers/courses/[id]'
import { HomeTrendsCourseComment } from '../../../home/trends/Comment'

export const CourseDetailsMoreComments = () => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  const courseDetails = useAtomValue(courseDetailsAtom)
  const [courseDetailsView, setCourseDetailsView] = useAtom(
    courseDetailsViewAtom
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const recentComments = courseDetails
    ? courseDetails.comments
        .find(comment => comment.name === '清廉街')
        ?.comments.slice(0, 4) || []
    : []

  const currentComments = useMemo(
    () =>
      courseDetails
        ? courseDetails.comments.find(
            comment => comment.name === courseDetailsView.comments
          )?.comments || []
        : [],
    [courseDetails, courseDetailsView.comments]
  )

  const handleSource = (name: '清廉街' | '腐败街') => {
    setCourseDetailsView(view => ({ ...view, comments: name }))
    setAnchorEl(null)
    if (scrollRef && scrollRef.current) scrollRef.current.scrollTop = 0
  }

  return (
    <Fragment>
      <CardActionArea
        onClick={() => setOpen(true)}
        sx={{ pl: 2.25, pr: 2, py: 1.5 }}
      >
        <Stack
          direction="row"
          spacing={2.5}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {recentComments.length === 0 ? '查看历史评论' : '查看更多评论'}
          </Typography>
          <SmsOutlined sx={{ color: 'text.disabled', width: 20, height: 20 }} />
        </Stack>
      </CardActionArea>

      <Dialog
        title="课程评论"
        fullWidth
        keepMounted
        maxWidth={false}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDialog-paper.MuiPaper-root': {
            width: { xs: 'calc(100vw - 32px)', sm: 'calc(100vw - 64px)' },
            m: { xs: 2, sm: 4 },
            maxWidth: { xs: '100%', sm: '24rem' },
          },
        }}
      >
        <DialogTitle sx={{ pt: 1.25, pb: 0.5, px: 1.25 }}>
          <Stack spacing={2} direction="row" sx={{ alignItems: 'baseline' }}>
            <Typography
              sx={{
                flex: 1,
                px: 1.25,
                fontSize: 'body1.fontSize',
                fontWeight: 700,
              }}
            >
              课程评论
            </Typography>
            <Button
              color="primary"
              onClick={e => setAnchorEl(e.currentTarget)}
              sx={{
                width: 'fit-content',
                py: 0.375,
                pr: 1.25,
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 'body2.fontSize',
                  fontWeight: 700,
                  color: 'text.primary',
                  pr: 0.5,
                  py: 0.5,
                }}
              >
                {courseDetailsView.comments}
              </Typography>
              <ExpandMoreOutlined
                sx={{
                  color: 'text.disabled',
                  width: 20,
                  height: 20,
                  transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={() => setAnchorEl(null)}
              TransitionComponent={Fade}
            >
              {courseDetails &&
                courseDetails.comments.map(comment => (
                  <MenuItem
                    key={comment.name}
                    selected={courseDetailsView.comments === comment.name}
                    onClick={() => handleSource(comment.name)}
                    sx={{ minWidth: 120, minHeight: 'unset' }}
                  >
                    <ListItemText sx={{ flex: 1 }}>{comment.name}</ListItemText>
                    {comment.name === courseDetailsView.comments && (
                      <ListItemIcon sx={{ pl: 2 }}>
                        <CheckOutlined sx={{ fontSize: 20 }} />
                      </ListItemIcon>
                    )}
                  </MenuItem>
                ))}
            </Menu>
          </Stack>
        </DialogTitle>
        <DialogContent
          ref={scrollRef}
          sx={{
            px: 0,
            overflow: 'auto',
            maxHeight: '75vh',
            minHeight: '45vh',
            display: 'flex',
            alignItems: currentComments.length === 0 ? 'center' : 'flex:start',
            justifyContent: 'center',
          }}
        >
          <List dense sx={{ pt: 0, width: '100%' }}>
            {currentComments.slice(0, 20 * page).map(comment => (
              <HomeTrendsCourseComment key={comment.id} comment={comment} />
            ))}

            <ListItem disablePadding sx={{ mb: 1.5 }}>
              {page * 20 >= currentComments.length ? (
                <Typography
                  variant="body2"
                  sx={{
                    pt: 1,
                    pb: currentComments.length === 0 ? 2 : 1,
                    color: 'text.disabled',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  没有更多评论了
                </Typography>
              ) : (
                <ListItemButton
                  onClick={() => setPage(page => page + 1)}
                  sx={{ py: 1, justifyContent: 'center' }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    加载更多评论
                  </Typography>
                </ListItemButton>
              )}
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
