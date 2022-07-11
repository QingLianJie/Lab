import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { modalsAtom } from '../../../contexts/booleans'

export const Login = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const [title, setTitle] = useState('登录')

  useEffect(() => {
    if (modals.auth) setTitle(modals.auth)
  }, [modals.auth])

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={!!modals.auth}
      onClose={() => setModals({ ...modals, auth: false })}
      sx={{
        '& .MuiPaper-root': { maxWidth: '18rem' },
        '& .MuiDialogContent-root': { p: 0 },
      }}
    >
      <DialogTitle>
        <Typography
          component="p"
          variant="h6"
          sx={{ textAlign: 'center', pt: 3, pb: 0.5, fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', pb: 2.5 }}
        >
          欢迎来到清廉街
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack sx={{ p: 2, alignItems: 'center' }}>
          <Typography sx={{ color: 'text.secondary', fontWeight: 700 }}>
            Work in Progress
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
