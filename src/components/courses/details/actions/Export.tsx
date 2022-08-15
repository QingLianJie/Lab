import { FileDownloadOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { courseDetailsAtom } from '../../../../routers/courses/[id]'
import { Tooltip } from '../../../base/styled/Tooltip'

export const CourseDetailsExport = () => {
  const courseDetails = useAtomValue(courseDetailsAtom)

  const handleExport = () => {
    if (!courseDetails) return
    const data = courseDetails.statistics

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = href
    link.download = `${
      courseDetails.course.name
    } 导出的统计数据 ${dayjs().format('YYYY-MM-DD HH-mm-ss')}.json`.trim()
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  return (
    <Tooltip title="导出统计数据 (JSON)" arrow placement="top">
      <IconButton
        aria-label="导出统计数据"
        sx={{
          color: 'text.disabled',
          '&:hover': { color: 'text.primary' },
          transition: 'all 0.2s',
        }}
        onClick={handleExport}
      >
        <FileDownloadOutlined />
      </IconButton>
    </Tooltip>
  )
}
