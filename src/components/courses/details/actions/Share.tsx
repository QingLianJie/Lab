import { QrCodeOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, ButtonGroup, IconButton, Stack, useTheme } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useState, Fragment } from 'react'
import { info } from '../../../../configs/site-info'
import { type CourseDetails } from '../../../../index.d'
import { Modal } from '../../../base/Modal'
import { Tooltip } from '../../../base/styled/Tooltip'
import { QRCodeCanvas } from 'qrcode.react'

interface CourseDetailsShareProps {
  details: CourseDetails
}

export const CourseDetailsShare = ({ details }: CourseDetailsShareProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Tooltip title="分享课程" arrow placement="top">
        <IconButton
          aria-label="分享课程"
          onClick={() => setOpen(true)}
          sx={{
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
        >
          <QrCodeOutlined />
        </IconButton>
      </Tooltip>

      <Modal
        title="分享课程"
        fullWidth
        maxWidth={false}
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
      >
        <Stack spacing={1.5} sx={{ px: 2.5, pb: 2.5 }}>
          <QRCodeCanvas
            size={216}
            value={location.href}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            includeMargin={true}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              borderRadius: '4px',
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigator.clipboard
                .writeText(location.href)
                .then(() => enqueueSnackbar('✅ 已复制'))
            }
            sx={{ py: 0.75 }}
          >
            复制课程链接
          </Button>
          {'share' in navigator && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                navigator.share({
                  url: location.href,
                  title: `${details.course.name} - ${info.name}`,
                  text: `在${info.name}上查看 ${details.course.name} 课程数据`,
                })
              }
              sx={{ py: 0.625 }}
            >
              直接分享课程
            </Button>
          )}
        </Stack>
      </Modal>
    </Fragment>
  )
}
