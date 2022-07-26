import { FileDownloadOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { Tooltip } from '../../base/Tooltip'

export const Export = () => {
  const handleExport = () => enqueueSnackbar('这个功能还没做')

  return (
    <Tooltip title="导出" arrow placement="top">
      <IconButton
        aria-label="导出"
        sx={{ color: 'text.secondary' }}
        onClick={handleExport}
      >
        <FileDownloadOutlined />
      </IconButton>
    </Tooltip>
  )
}
