import { HistoryOutlined } from '@mui/icons-material'
import {
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material'
import { useAtom } from 'jotai'
import { omit } from 'lodash'
import { Fragment, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  type CoursesHistory,
  coursesHistoryAtom,
} from '../../../../contexts/courses'
import { calendarTime, removeEmpty } from '../../../../utils/format'
import { Modal } from '../../../base/Modal'
import { Tooltip } from '../../../base/styled/Tooltip'

const keyMap = {
  type: '课程分类',
  nature: '课程性质',
  test: '考试类型',
  credit: '课程学分',
  period: '课程学时',
}

export const CoursesHistoryAction = () => {
  const [open, setOpen] = useState(false)
  const [coursesHistory, setCoursesHistory] = useAtom(coursesHistoryAtom)
  const [parmas, setParams] = useSearchParams()

  const handleHistory = (history: CoursesHistory) => {
    const params = omit(history, ['id'])
    setParams(new URLSearchParams(params || '').toString())
    setOpen(false)

    const data = removeEmpty(params)
    setCoursesHistory(coursesHistory => [
      { ...data, id: new Date().getTime() },
      ...coursesHistory,
    ])
  }

  return (
    <Fragment>
      <Tooltip title="搜索历史" arrow placement="top">
        <IconButton
          aria-label="搜索历史"
          onClick={() => setOpen(true)}
          sx={{
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
        >
          <HistoryOutlined />
        </IconButton>
      </Tooltip>

      <Modal
        title="搜索历史"
        fullWidth
        maxWidth={false}
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: '18rem' } }}
      >
        <Stack>
          <Typography
            variant="body2"
            sx={{ px: 3, pb: 2.5, color: 'text.secondary' }}
          >
            课程搜索记录储存在浏览器中，关闭浏览器后会自动删除。
          </Typography>
          <Divider />
          {coursesHistory.length === 0 ? (
            <Typography
              variant="body1"
              sx={{
                px: 3,
                pt: 3,
                pb: 6,
                color: 'text.disabled',
                width: '100%',
                textAlign: 'center',
              }}
            >
              没有课程搜索记录
            </Typography>
          ) : (
            <List dense sx={{ maxHeight: 300, overflowY: 'auto', py: 1 }}>
              {coursesHistory.map(history => (
                <ListItem disablePadding key={history.id}>
                  <ListItemButton
                    onClick={() => handleHistory(history)}
                    sx={{ px: 3, pt: 1.25, pb: 1.5 }}
                  >
                    <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: 'text.secondary' }}
                      >
                        {calendarTime(history.id)}
                      </Typography>

                      <Stack spacing={0.75}>
                        {Object.entries(history)
                          .filter(([key, value]) => key !== 'id' && value)
                          .map(([key, value]) => (
                            <Stack key={key} direction="row" spacing={1.5}>
                              <Chip
                                label={keyMap[key as keyof typeof keyMap]}
                                size="small"
                                sx={{ ml: -0.25, fontSize: 'caption.fontSize' }}
                              />
                              <Typography>{value}</Typography>
                            </Stack>
                          ))}
                      </Stack>
                    </Stack>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Stack>
      </Modal>
    </Fragment>
  )
}
