import { ExpandMoreOutlined, SmsOutlined } from '@mui/icons-material'
import {
  Button,
  CardActionArea,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { Fragment, useMemo, useRef, useState } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { type CourseDetails } from '../../../../index.d'
import { HomeTrendsCourseComment } from '../../../home/trends/Comment'

interface CourseDetailsMoreCommentsProps {
  details: CourseDetails
}

export const CourseDetailsMoreComments = ({
  details,
}: CourseDetailsMoreCommentsProps) => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [source, setSource] = useState<'清廉街' | '腐败街'>('清廉街')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const recentComments =
    details.comments
      .find(comment => comment.name === '清廉街')
      ?.comments.slice(0, 4) || []

  const currentComments = useMemo(
    () =>
      details.comments.find(comment => comment.name === source)?.comments || [],
    [source]
  )

  const handleSource = (name: '清廉街' | '腐败街') => {
    setSource(name)
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
        <DialogTitle sx={{ pt: 1.75, pb: 1.5, px: 1.75 }}>
          <Stack spacing={2} direction="row" sx={{ alignItems: 'baseline' }}>
            <Typography
              sx={{
                flex: 1,
                px: 0.75,
                fontSize: 'body1.fontSize',
                fontWeight: 700,
              }}
            >
              课程评论
            </Typography>
            <Button
              color="primary"
              onClick={e => setAnchorEl(e.currentTarget)}
              endIcon={<Icon component={ExpandMoreOutlined} />}
              sx={{ width: 'fit-content', alignItems: 'center' }}
            >
              {source}
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              {details.comments.map(comment => (
                <MenuItem
                  key={comment.name}
                  selected={source === comment.name}
                  onClick={() => handleSource(comment.name)}
                >
                  {comment.name}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </DialogTitle>
        <DialogContent
          ref={scrollRef}
          sx={{ px: 0, pb: 1.5, overflow: 'auto', maxHeight: '75vh' }}
        >
          <List dense sx={{ py: 0 }}>
            <TransitionGroup>
              {currentComments.slice(0, 20 * page).map(comment => (
                <Collapse key={comment.id}>
                  <HomeTrendsCourseComment comment={comment} />
                </Collapse>
              ))}
            </TransitionGroup>

            <ListItem disablePadding>
              {page * 20 >= currentComments.length ? (
                <Typography
                  variant="body2"
                  sx={{
                    py: 1,
                    color: 'text.secondary',
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
