import { FileDownloadOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import dayjs from 'dayjs'
import { type CourseDetails } from '../../../../index.d'
import { Tooltip } from '../../../base/styled/Tooltip'

interface CourseDetailsExportProps {
  details: CourseDetails
}

export const CourseDetailsExport = ({ details }: CourseDetailsExportProps) => {
  const handleExport = () => {
    const data = details.statistics

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = href
    link.download = `${details.course.name} 导出的统计数据 ${dayjs().format(
      'YYYY-MM-DD HH-mm-ss'
    )}.json`.trim()
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
