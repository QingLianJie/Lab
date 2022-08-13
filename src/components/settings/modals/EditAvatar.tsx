import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Typography } from '@mui/material'
import 'cropperjs/dist/cropper.css'
import { useAtomValue } from 'jotai'
import ky from 'ky'
import { enqueueSnackbar } from 'notistack'
import { Fragment, useRef, useState, type ChangeEvent } from 'react'
import Cropper from 'react-cropper'
import { Helmet } from 'react-helmet-async'
import { useSWRConfig } from 'swr'
import { info, prefix } from '../../../configs/site-info'
import { accountAtom, settingsAtom } from '../../../contexts/settings'
import { Modal } from '../../base/Modal'

interface EditAvatarModalProps {
  open: boolean
  onClose: () => void
}

export const EditAvatarModal = ({ open, onClose }: EditAvatarModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string>('')
  const [cropper, setCropper] = useState<Cropper | null>(null)

  const { mutate } = useSWRConfig()
  const settings = useAtomValue(settingsAtom)
  const account = useAtomValue(accountAtom)
  const [loading, setLoading] = useState(false)

  const handleSelect = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result?.toString() || '')
    reader.readAsDataURL(file as Blob)
  }

  const handleUpload = () => {
    if (!cropper) return
    setLoading(true)
    const canvas = cropper.getCroppedCanvas({
      maxWidth: 512,
      maxHeight: 512,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
      fillColor: '#ffffff',
    })

    canvas.toBlob(blob => {
      if (!blob) return
      const formdata = new FormData()
      const name = `user-avatar-${
        account ? account.id : 'unknown'
      }-${new Date().getTime()}.jpeg`
      formdata.append('image', blob, name)

      ky.post(`${settings.developer.api || prefix}/api/user/profile/photo`, {
        body: formdata,
        credentials: 'include',
      })
        .then(() => {
          enqueueSnackbar('头像上传成功')
          mutate(`${settings.developer.api || prefix}/api/user`)
          mutate(
            `${settings.developer.api || prefix}/api/profile/${
              account ? account.name : ''
            }`
          )
          mutate(`${settings.developer.api || prefix}/api/recent/comments`)
          setLoading(false)
          onClose()
          setImage('')
          setCropper(null)
        })
        .catch((error: Error) => {
          console.error(error)
          enqueueSnackbar('头像上传失败')
          setLoading(false)
        })
    }, 'image/jpeg')
  }

  return (
    <Modal
      title="修改头像"
      fullWidth
      maxWidth={false}
      keepMounted
      open={open}
      onClose={onClose}
      sx={{ '& .MuiPaper-root': { maxWidth: '18rem' } }}
    >
      {open && (
        <Helmet>
          <title>修改头像 - {info.name}</title>
        </Helmet>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleSelect}
      />
      <Stack
        spacing={1.5}
        sx={{
          width: '100%',
          px: 2.5,
          pb: 2.5,
          '& .cropper-container .cropper-view-box': { borderRadius: '50%' },
        }}
      >
        {image ? (
          <Fragment>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                pb: 0.25,
                height: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Cropper
                src={image}
                alt="用户上传头像"
                initialAspectRatio={1}
                aspectRatio={1}
                guides={false}
                onInitialized={instance => setCropper(instance)}
                viewMode={1}
                minCropBoxHeight={50}
                minCropBoxWidth={50}
                movable={false}
                rotatable={false}
                scalable={false}
                zoomable={false}
                zoomOnTouch={false}
                zoomOnWheel={false}
                checkOrientation={false}
                style={{ overflow: 'hidden', margin: '-3px 0 -5px' }}
              />
            </Box>

            <LoadingButton
              variant="contained"
              color="secondary"
              loading={loading}
              sx={{ py: 0.75 }}
              onClick={handleUpload}
            >
              上传头像
            </LoadingButton>
          </Fragment>
        ) : (
          <Typography
            variant="body2"
            sx={{ mt: -0.5, px: 0.5, color: 'text.secondary' }}
          >
            支持 JPG、PNG、WebP
            等常见格式图片的上传，上传的图片会经过压缩处理，上传不合适的图片会被删除账号。
          </Typography>
        )}

        <Button
          variant={image ? 'outlined' : 'contained'}
          color="secondary"
          onClick={() => inputRef.current?.click()}
          sx={{ py: image ? 0.625 : 0.75 }}
        >
          {image ? '重新选择图片' : '点击选择图片'}
        </Button>
      </Stack>
    </Modal>
  )
}
