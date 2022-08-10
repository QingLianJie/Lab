import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { modalsAtom } from '../../../../contexts/modals'
import { NameRegex, PasswordRegex } from '../../../../utils/format'

type RegisterForm = {
  email: string
  name: string
  password: string
}

export const AuthRegister = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const inputRef = useRef<HTMLInputElement>()
  const captchaRef = useRef<HTMLInputElement>()

  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState<RegisterForm>({
    email: '',
    name: '',
    password: '',
  })

  useEffect(() => {
    if (!inputRef.current || modals.auth !== '注册') return
    inputRef.current?.focus()
  }, [modals.auth])

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()
    enqueueSnackbar('这个功能还没做')
    setModals({ ...modals, auth: false })
  }

  return (
    <Stack
      component="form"
      spacing={1.5}
      onSubmit={handleRegister}
      sx={{ px: 2.5, pb: 2.5, alignItems: 'center' }}
    >
      <TextField
        inputRef={inputRef}
        inputProps={{ pattern: NameRegex }}
        required
        name="name"
        label="昵称"
        size="small"
        autoComplete="username"
        fullWidth
        autoFocus
        value={form.name}
        helperText="独一无二的名字，3 到 16 个字符"
        onChange={e => setForm({ ...form, name: e.target.value })}
        InputProps={{
          endAdornment: form.name.length > 0 && (
            <InputAdornment position={'end'}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {form.name.length}
              </Typography>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        required
        name="email"
        type="email"
        label="邮箱"
        size="small"
        autoComplete="email"
        fullWidth
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <TextField
        inputProps={{ pattern: PasswordRegex }}
        type={showPassword ? 'text' : 'password'}
        required
        name="password"
        label="密码"
        size="small"
        fullWidth
        value={form.password}
        autoComplete="new-password"
        helperText="8 到 24 个字符，且不能为纯数字"
        onChange={e => setForm({ ...form, password: e.target.value })}
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
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: '100%', py: 0.75 }}
      >
        注册
      </Button>
    </Stack>
  )
}
