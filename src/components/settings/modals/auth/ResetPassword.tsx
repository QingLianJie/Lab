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
import { PasswordRegex } from '../../../../utils/format'

type ResetPasswordForm = {
  captcha: string
  email: string
  password: string
}

export const AuthResetPassword = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const inputRef = useRef<HTMLInputElement>()
  const captchaRef = useRef<HTMLInputElement>()

  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState<ResetPasswordForm>({
    captcha: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (!inputRef.current || modals.auth !== '重置密码') return
    inputRef.current?.focus()
  }, [modals.auth])

  const handleResetPassword = (e: FormEvent) => {
    e.preventDefault()
    enqueueSnackbar('这个功能还没做')
    setModals({ ...modals, auth: false })
  }

  const handleSendCaptcha = () => {
    enqueueSnackbar('这个功能还没做')
  }

  return (
    <Stack
      component="form"
      spacing={1.5}
      onSubmit={handleResetPassword}
      sx={{ px: 2.5, pb: 2.5, alignItems: 'center' }}
    >
      <TextField
        inputRef={inputRef}
        required
        name="email"
        type="email"
        label="注册时用的邮箱"
        size="small"
        autoComplete="email"
        fullWidth
        autoFocus
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: '100%', mr: 1.5, py: 0.75 }}
          onClick={handleSendCaptcha}
        >
          发送验证码
        </Button>

        <TextField
          inputRef={captchaRef}
          required
          name="captcha"
          label="验证码"
          size="small"
          autoComplete="one-time-code"
          fullWidth
          autoFocus
          value={form.captcha}
          onChange={e => setForm({ ...form, captcha: e.target.value })}
          sx={{ p: 0 }}
        />
      </Stack>

      <TextField
        inputProps={{ pattern: PasswordRegex }}
        type={showPassword ? 'text' : 'password'}
        required
        name="password"
        label="新的密码"
        size="small"
        autoComplete="new-password"
        fullWidth
        value={form.password}
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
        重置密码
      </Button>
    </Stack>
  )
}
