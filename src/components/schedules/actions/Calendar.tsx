import { BrowseGalleryOutlined } from '@mui/icons-material'
import { IconButton, Stack, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { modalsAtom } from '../../../contexts/modals'
import { schedulesAtom, schedulesViewAtom } from '../../../contexts/schedules'
import { Modal } from '../../base/Modal'
import { Tooltip } from '../../base/styled/Tooltip'

export const SchedulesCalendarAction = () => {
  const [modals, setModals] = useAtom(modalsAtom)

  return (
    <Tooltip title="设置课表起始" arrow placement="top">
      <IconButton
        aria-label="设置课表起始"
        onClick={() =>
          setModals(modals => ({
            ...modals,
            schedules: { ...modals.schedules, calendar: true },
          }))
        }
        sx={{
          color: 'text.disabled',
          '&:hover': { color: 'text.primary' },
          transition: 'all 0.2s',
        }}
      >
        <BrowseGalleryOutlined />
      </IconButton>
    </Tooltip>
  )
}

export const SchedulesCalendarModal = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const schedules = useAtomValue(schedulesAtom)
  const [schedulesView, setSchedulesView] = useAtom(schedulesViewAtom)
  const len = schedules ? schedules.timetable.weeks.length : 1

  const handleDate = (date: string) => {
    if (!date) {
      setSchedulesView(view => ({ ...view, start: date }))
      return
    }
    const monday = dayjs(date).day(1).format('YYYY-MM-DD')
    setSchedulesView(view => ({ ...view, start: monday }))
  }

  useEffect(() => {
    if (!schedulesView.start) return
    const now = dayjs().day(1)
    const start = dayjs(schedulesView.start).day(1)
    const diff = now.diff(start, 'week') + 1

    setSchedulesView({
      ...schedulesView,
      week: diff > len || diff < 0 ? 1 : diff,
    })
  }, [schedulesView.start])

  return (
    <Modal
      title="课表起始"
      fullWidth
      maxWidth={false}
      keepMounted
      open={modals.schedules.calendar}
      onClose={() =>
        setModals(modals => ({
          ...modals,
          schedules: { ...modals.schedules, calendar: false },
        }))
      }
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
  )
}
