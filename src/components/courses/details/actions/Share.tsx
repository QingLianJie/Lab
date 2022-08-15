import { QrCodeOutlined } from '@mui/icons-material'
import { Button, IconButton, Stack } from '@mui/material'
import { useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { QRCodeCanvas } from 'qrcode.react'
import { Fragment, useState } from 'react'
import { info } from '../../../../configs/site-info'
import { courseDetailsAtom } from '../../../../routers/courses/[id]'
import { Modal } from '../../../base/Modal'
import { Tooltip } from '../../../base/styled/Tooltip'

export const CourseDetailsShare = () => {
  const courseDetails = useAtomValue(courseDetailsAtom)
  const name = courseDetails ? courseDetails.course.name : '未知课程'
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
                  title: `${name} - ${info.name}`,
                  text: `在${info.name}上查看 ${name} 课程数据`,
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
