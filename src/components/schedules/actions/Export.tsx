import { FileDownloadOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { toPng } from 'html-to-image'
import { useAtomValue } from 'jotai'
import { Fragment, useState } from 'react'
import { studentAtom } from '../../../contexts/bridge'
import { schedulesAtom, schedulesViewAtom } from '../../../contexts/schedules'
import { Modal } from '../../base/Modal'
import { Tooltip } from '../../base/styled/Tooltip'

export const SchedulesExportAction = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const schedules = useAtomValue(schedulesAtom)
  const schedulesView = useAtomValue(schedulesViewAtom)
  const student = useAtomValue(studentAtom)

  const handleExportImage = () => {
    const timetable = document.querySelector('#timetable') as HTMLElement
    if (!timetable) return
    setLoading(true)
    toPng(timetable, {
      cacheBust: true,
      pixelRatio: 2,
      style: { minWidth: '640px' },
    })
      .then(data => {
        const link = document.createElement('a')
        link.download = `${student ? student.id : ''} 的第 ${
          schedulesView.week
        } 周课表.jpg`
        link.href = data
        link.click()
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }

  const handleExportJSON = () => {
    const data = schedules ? schedules.timetable : { message: '没有数据' }
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    handleDownload(href)
  }

  const handleDownload = (href: string) => {
    const link = document.createElement('a')
    link.href = href
    link.download = `${student ? student.id : ''} 导出的课表 ${dayjs().format(
      'YYYY-MM-DD HH-mm-ss'
    )}.json`.trim()
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  return (
    <Fragment>
      <Tooltip title="导出课表" arrow placement="top">
        <IconButton
          aria-label="导出课表"
          onClick={() => setOpen(true)}
          sx={{
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
        >
          <FileDownloadOutlined />
        </IconButton>
      </Tooltip>

      <Modal
        title="课表导出"
        fullWidth
        maxWidth={false}
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
      >
        <Stack spacing={1} sx={{ px: 3, pb: 2.5 }}>
          <Typography variant="body2">
            清廉街的课表系统做的不是很完善，如果你想要课程提醒之类的高级功能，可以使用
            WakeUp 课程表、小爱课程表、超级课程表等课表应用。
          </Typography>
          <Typography variant="body2">
            同时，考虑到课表数据可能会更新，我们更推荐使用上述应用自带的教务系统方式进行导入，而不是通过清廉街中转导入。
          </Typography>
        </Stack>
        <Stack spacing={1.5} sx={{ px: 2.5, pb: 2.5 }}>
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleExportImage}
            loading={loading}
            sx={{ py: 0.75 }}
          >
            导出当前周课表为图片
          </LoadingButton>
          <ButtonGroup
            variant="outlined"
            color="info"
            disableElevation
            fullWidth
            size="small"
          >
            <Tooltip title="正在适配中" arrow placement="top">
              <Button sx={{ py: 0.75 }}>CSV</Button>
            </Tooltip>
            <Tooltip title="清廉街使用的格式" arrow placement="top">
              <Button onClick={handleExportJSON} sx={{ py: 0.75 }}>
                JSON
              </Button>
            </Tooltip>
            <Tooltip title="正在适配中" arrow placement="top">
              <Button sx={{ py: 0.75 }}>ICS</Button>
            </Tooltip>
          </ButtonGroup>
        </Stack>
      </Modal>
    </Fragment>
  )
}
