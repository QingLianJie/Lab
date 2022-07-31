import { FileDownloadOutlined } from '@mui/icons-material'
import {
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { Fragment, useState } from 'react'
import { Modal } from '../../base/Modal'
import { Tooltip } from '../../base/styled/Tooltip'

export const SchedulesExportAction = () => {
  const [open, setOpen] = useState(false)

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
        <Stack spacing={1} sx={{ px: 3, pb: 2 }}>
          <Typography variant="body2" sx={{ textAlign: 'justify' }}>
            清廉街的课表系统做的不是很完善，如果你想要课程提醒之类的高级功能，可以使用
            WakeUp 课程表、小爱课程表、超级课程表等课表应用。
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'justify' }}>
            同时，考虑到课表数据可能会更新，我们更推荐使用上述应用自带的教务系统方式进行导入，而不是通过清廉街中转导入。
          </Typography>
        </Stack>
        <Stack spacing={1.5} sx={{ px: 2.5, pb: 2.5 }}>
          <ButtonGroup
            variant="outlined"
            disableElevation
            orientation="vertical"
            size="small"
            disabled
          >
            <Button>分周课表 (JSON)</Button>
            <Button>汇总课表 (JSON)</Button>
            <Button>WakeUp 课表的 CSV 格式</Button>
          </ButtonGroup>
        </Stack>
      </Modal>
    </Fragment>
  )
}
