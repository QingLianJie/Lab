import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import ky, { type HTTPError } from 'ky'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSWRConfig } from 'swr'
import { ninja } from '../../../../configs/site-info'
import { modalsAtom } from '../../../../contexts/modals'
import { settingsAtom } from '../../../../contexts/settings'
import { EmailRegex } from '../../../../utils/format'

type LoginForm = {
  name: string
  password: string
}

export const AuthLogin = () => {
  const settings = useAtomValue(settingsAtom)
  const [modals, setModals] = useAtom(modalsAtom)
  const inputRef = useRef<HTMLInputElement>()

  const [form, setForm] = useState<LoginForm>({ name: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { mutate } = useSWRConfig()

  useEffect(() => {
    if (!inputRef.current || modals.auth !== '登录') return
    inputRef.current?.focus()
  }, [modals.auth])

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const isEmail = new RegExp(EmailRegex).test(form.name)
    ky.post(
      `${settings.developer.api || ninja}/auth/login/${
        isEmail ? 'email' : 'username'
      }`,
      {
        json: isEmail
          ? { email: form.name, password: form.password }
          : { username: form.name, password: form.password },
        credentials: 'include',
      }
    )
      .then(() => {
        enqueueSnackbar('登录成功')
        setModals({ ...modals, auth: false })
        setLoading(false)
        mutate(`${settings.developer.api || ninja}/auth/me`)
      })
      .catch((error: HTTPError) => {
        console.error(error)
        setLoading(false)
        error.response
          .json()
          .then((messages: { [key: string]: string }) =>
            Object.values(messages).forEach((message: string) =>
              enqueueSnackbar(`登录失败 - ${message}`)
            )
          )
      })
  }

  return (
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
        disabled={loading}
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
        disabled={loading}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        loading={loading}
        color="primary"
        sx={{ width: '100%', mt: 1, py: 0.75 }}
      >
        登录
      </LoadingButton>
    </Stack>
  )
}
