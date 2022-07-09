import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'

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
  <Dialog open={open} onClose={onClose}>
    <DialogTitle sx={{ pb: 1, fontSize: '1.125rem', fontWeight: 700 }}>
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
