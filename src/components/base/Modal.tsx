import { CloseOutlined } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  type DialogProps,
  IconButton,
  Typography,
  Stack,
} from '@mui/material'
import { type ReactNode } from 'react'

interface ConfirmProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  isDanger?: boolean
}

export const Confirm = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  isDanger,
}: ConfirmProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    sx={{
      mb: { xs: 6, sm: 2 },
      '& .MuiPaper-root': { maxWidth: '16rem' },
    }}
  >
    <DialogTitle sx={{ pb: 1, fontSize: '1rem', fontWeight: 700 }}>
      {title}
    </DialogTitle>
    {description && (
      <DialogContent sx={{ pb: 1 }}>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
    )}

    <DialogActions>
      <Button onClick={onClose}>取消</Button>
      <Button onClick={onConfirm} autoFocus color={isDanger ? 'error' : 'info'}>
        确认
      </Button>
    </DialogActions>
  </Dialog>
)

interface ModalProps extends DialogProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
}

export const Modal = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  ...props
}: ModalProps) => (
  <Dialog open={open} onClose={onClose} {...props}>
    <DialogTitle sx={{ pt: 2.25, pb: 2 }}>
      <Stack spacing={0.375}>
        <Typography
          sx={{
            fontSize: subtitle ? '1.125rem' : 'body1.fontSize',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      <IconButton
        aria-label="关闭"
        title="关闭"
        onClick={onClose}
        sx={{ position: 'absolute', right: 12, top: subtitle ? 10 : 9 }}
      >
        <CloseOutlined
          sx={{
            color: 'text.disabled',
            '&:hover': { color: 'text.primary' },
            transition: 'all 0.2s',
          }}
        />
      </IconButton>
    </DialogTitle>
    <DialogContent sx={{ p: 0, overflow: 'unset' }}>{children}</DialogContent>
  </Dialog>
)
