import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import ky, { type HTTPError } from 'ky'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ninja } from '../../../../configs/site-info'
import { modalsAtom } from '../../../../contexts/modals'
import { settingsAtom } from '../../../../contexts/settings'
import { PasswordRegex } from '../../../../utils/format'

type ResetPasswordForm = {
  captcha: string
  email: string
  password: string
}

let timer: number | null = null

export const AuthResetPassword = () => {
  const inputRef = useRef<HTMLInputElement>()
  const captchaRef = useRef<HTMLInputElement>()

  const [modals, setModals] = useAtom(modalsAtom)
  const settings = useAtomValue(settingsAtom)

  const [submitLoading, setSubmitLoading] = useState(false)
  const [captchaLoading, setCaptchaLoading] = useState(false)
  const [captchaTime, setCaptchaTime] = useState(0)
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

  useEffect(() => {
    if (captchaTime === 60)
      timer = setInterval(() => setCaptchaTime(time => time - 1), 1000)
    else if (captchaTime === 0 && timer) clearInterval(timer)
  }, [captchaTime])

  const handleResetPassword = (e: FormEvent) => {
    e.preventDefault()
    setSubmitLoading(true)
    ky.put(`${settings.developer.api || ninja}/auth/password/reset`, {
      json: {
        email: form.email,
        verify_code: form.captcha,
        new_password: form.password,
      },
      credentials: 'include',
    })
      .then(() => {
        enqueueSnackbar('成功重置密码，请重新登录')
        setSubmitLoading(false)
        setModals({ ...modals, auth: '登录' })
      })
      .catch((error: HTTPError) => {
        console.error(error)
        setSubmitLoading(false)
        error.response
          .json()
          .then((messages: { [key: string]: string }) =>
            Object.values(messages).forEach((message: string) =>
              enqueueSnackbar(`重置密码失败 - ${message}`)
            )
          )
      })
  }

  const handleSendCaptcha = () => {
    if (!form.email) enqueueSnackbar('请填写注册时使用的邮箱')
    else {
      setCaptchaLoading(true)
      ky.post(`${settings.developer.api || ninja}/auth/password/reset`, {
        json: { email: form.email },
        credentials: 'include',
      })
        .then(() => {
          enqueueSnackbar('已发送邮件，请输入邮件中的验证码')
          setCaptchaTime(60)
          setCaptchaLoading(false)
        })
        .catch((error: HTTPError) => {
          console.error(error)
          setCaptchaTime(60)
          setCaptchaLoading(false)
          error.response
            .json()
            .then((messages: { [key: string]: string }) =>
              Object.values(messages).forEach((message: string) =>
                enqueueSnackbar(`发送邮件失败 - ${message}`)
              )
            )
        })
    }
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
        disabled={submitLoading || captchaLoading}
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <LoadingButton
          variant="outlined"
          color="primary"
          sx={{ width: '100%', mr: 1.5, py: 0.75 }}
          loading={captchaLoading}
          disabled={captchaTime > 0}
          onClick={handleSendCaptcha}
        >
          {captchaTime > 0 ? `已发送 ${captchaTime}s` : '发送验证码'}
        </LoadingButton>

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
          disabled={submitLoading || captchaLoading}
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
        disabled={submitLoading || captchaLoading}
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

      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={submitLoading}
        sx={{ width: '100%', py: 0.75 }}
      >
        重置密码
      </LoadingButton>
    </Stack>
  )
}
