import { Helmet } from 'react-helmet-async'
import { info } from '../../../configs/site-info'
import { Modal } from '../../base/Modal'

interface EditAvatarModalProps {
  open: boolean
  onClose: () => void
}

export const EditAvatarModal = ({ open, onClose }: EditAvatarModalProps) => {
  return (
    <Modal
      title="修改头像"
      fullWidth
      maxWidth={false}
      keepMounted
      open={open}
      onClose={onClose}
      sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
    >
      <Helmet>
        <title>修改头像 - {info.name}</title>
      </Helmet>
    </Modal>
  )
}
