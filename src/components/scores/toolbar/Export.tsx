import { FileDownloadOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { Tooltip } from '../../base/Tooltip'

export const Export = () => {
  const handleExport = () => enqueueSnackbar('这个功能还没做')

  return (
    <Tooltip title="导出当前表" arrow placement="top">
      <IconButton
        aria-label="导出当前表"
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
