import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import ky, { type HTTPError } from 'ky'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSWRConfig } from 'swr'
import { ninja } from '../../../../configs/site-info'
import { modalsAtom } from '../../../../contexts/modals'
import { settingsAtom } from '../../../../contexts/settings'
import { NameRegex, PasswordRegex } from '../../../../utils/format'

type RegisterForm = {
  email: string
  name: string
  password1: string
  password2: string
}

export const AuthRegister = () => {
  const settings = useAtomValue(settingsAtom)
  const inputRef = useRef<HTMLInputElement>()

  const [modals, setModals] = useAtom(modalsAtom)
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()

  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState<RegisterForm>({
    email: '',
    name: '',
    password1: '',
    password2: '',
  })

  useEffect(() => {
    if (!inputRef.current || modals.auth !== '注册') return
    inputRef.current?.focus()
  }, [modals.auth])

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()

    if (form.password1 !== form.password2) {
      enqueueSnackbar('两次输入的密码不一致')
      return
    }

    setLoading(true)
    ky.post(`${settings.developer.api || ninja}/api/auth/register/`, {
      json: {
        username: form.name,
        email: form.email,
        password: form.password1,
      },
      credentials: 'include',
    })
      .then(() => {
        enqueueSnackbar('注册成功')
        setModals({ ...modals, auth: false })
        setLoading(false)
        mutate(`${settings.developer.api || ninja}/api/user/me/`)
      })
      .catch((error: HTTPError) => {
        console.error(error)
        setLoading(false)
        error.response
          .json()
          .then((messages: { [key: string]: string }) =>
            Object.values(messages).forEach((message: string) =>
              enqueueSnackbar(`注册失败 - ${message}`)
            )
          )
      })
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
        disabled={loading}
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
        disabled={loading}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <TextField
        inputProps={{ pattern: PasswordRegex }}
        type={showPassword ? 'text' : 'password'}
        required
        name="password1"
        label="密码"
        size="small"
        fullWidth
        value={form.password1}
        autoComplete="new-password"
        disabled={loading}
        helperText="8 到 24 个字符，且不能为纯数字"
        onChange={e => setForm({ ...form, password1: e.target.value })}
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

      <TextField
        inputProps={{ pattern: PasswordRegex }}
        type={showPassword ? 'text' : 'password'}
        required
        name="password2"
        label="再次输入密码"
        size="small"
        fullWidth
        value={form.password2}
        autoComplete="new-password"
        disabled={loading}
        onChange={e => setForm({ ...form, password2: e.target.value })}
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

      <LoadingButton
        type="submit"
        variant="contained"
        loading={loading}
        color="primary"
        sx={{ width: '100%', py: 0.75 }}
      >
        注册
      </LoadingButton>
    </Stack>
  )
}
