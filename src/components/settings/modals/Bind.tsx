import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { modalsAtom } from '../../../contexts/booleans'
import { studentAtom } from '../../../contexts/bridge'

export const BindModal = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const [student, setStudent] = useAtom(studentAtom)
  const [showPassword, setShowPassword] = useState(false)

  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (!inputRef.current || !modals.bind) return
    inputRef.current?.focus()
  }, [modals.bind])

  const handleCancel = () => setModals({ ...modals, bind: false })

  const [id, setId] = useState(student ? student.id : '')
  const [password, setPassword] = useState(student ? student.password : '')

  const handleBind = (e: FormEvent) => {
    e.preventDefault()
    setStudent({ id, password })
    handleCancel()
    enqueueSnackbar(`已添加 HEU 账号：${id}`, { variant: 'success' })
  }

  const handleUnBind = () => {
    setStudent(false)
    setId('')
    setPassword('')
    handleCancel()
    enqueueSnackbar(`已移除 HEU 账号：${id}`, { variant: 'success' })
  }

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      keepMounted
      open={modals.bind}
      onClose={handleCancel}
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
          {student ? '修改' : '添加'} HEU 账号
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', pb: 2.5 }}
        >
          账号信息将储存在浏览器中
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack
          component="form"
          onSubmit={handleBind}
          sx={{ px: 3, pt: 2, pb: 3 }}
        >
          <TextField
            inputRef={inputRef}
            required
            name="id"
            label="学号"
            size="small"
            margin="dense"
            fullWidth
            autoFocus
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position={'end'} sx={{ mr: -1 }}>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    sx={{ color: 'text.disabled' }}
                  >
                    {showPassword ? (
                      <VisibilityOutlined fontSize="small" />
                    ) : (
                      <VisibilityOffOutlined fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            type={showPassword ? 'text' : 'password'}
            required
            name="password"
            label="密码"
            size="small"
            margin="dense"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '100%', mt: 1 }}
          >
            {student ? '修改' : '添加'}账号
          </Button>
          {student && (
            <Button
              type="button"
              variant="outlined"
              color="warning"
              sx={{ width: '100%', mt: 1.5, py: 0.625 }}
              onClick={handleUnBind}
            >
              移除当前账号
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
