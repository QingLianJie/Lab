import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { modalsAtom } from '../../../../contexts/modals'

type LoginForm = {
  name: string
  password: string
}

export const AuthLogin = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const inputRef = useRef<HTMLInputElement>()
  const [form, setForm] = useState<LoginForm>({ name: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!inputRef.current || modals.auth !== '登录') return
    inputRef.current?.focus()
  }, [modals.auth])

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    enqueueSnackbar('这个功能还没做')
  }

  return (
    <Stack>
      <Stack
        component="form"
        spacing={1.5}
        onSubmit={handleLogin}
        sx={{ px: 2.5, pb: 2.5, alignItems: 'center' }}
      >
        <TextField
          inputRef={inputRef}
          required
          name="name"
          label="用户名或邮箱"
          size="small"
          fullWidth
          autoComplete="username"
          autoFocus
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
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
          autoComplete="current-password"
          fullWidth
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '100%', mt: 1, py: 0.75 }}
        >
          登录
        </Button>
      </Stack>
    </Stack>
  )
}
