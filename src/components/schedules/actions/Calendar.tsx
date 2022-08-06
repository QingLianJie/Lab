import { BrowseGalleryOutlined } from '@mui/icons-material'
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { Fragment, useState } from 'react'
import { schedulesViewAtom } from '../../../contexts/schedules'
import { Modal } from '../../base/Modal'
import { Tooltip } from '../../base/styled/Tooltip'

export const SchedulesCalendarAction = () => {
  const [open, setOpen] = useState(false)
  const [schedulesView, setSchedulesView] = useAtom(schedulesViewAtom)

  const handleDate = (date: string) => {
    if (!date) {
      setSchedulesView(view => ({ ...view, start: date }))
      return
    }
    const monday = dayjs(date).day(1).format('YYYY-MM-DD')
    setSchedulesView(view => ({ ...view, start: monday }))
  }

  return (
    <Fragment>
      <Tooltip title="设置课表起始" arrow placement="top">
        <IconButton
          aria-label="设置课表起始"
          onClick={() => setOpen(true)}
          sx={{
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
        >
          <BrowseGalleryOutlined />
        </IconButton>
      </Tooltip>
      <Modal
        title="课表起始"
        fullWidth
        maxWidth={false}
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
      >
        <Stack spacing={1.5} sx={{ px: 2.5, pb: 2.5 }}>
          <Typography variant="body2" sx={{ px: 0.5, pb: 1 }}>
            选择课表的第一周日期，就可以在表格中显示当前星期所在的日期信息，以及计算当前周数。
          </Typography>
          <TextField
            id="date"
            label="选择课表第一周中任意一天"
            type="date"
            size="small"
            fullWidth
            value={schedulesView.start}
            onChange={e => handleDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Modal>
    </Fragment>
  )
}
