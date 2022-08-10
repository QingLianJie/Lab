import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import { useAtom } from 'jotai'
import ky, { HTTPError } from 'ky'
import { enqueueSnackbar } from 'notistack'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSWRConfig } from 'swr'
import { info, prefix } from '../../../configs/site-info'
import { modalsAtom } from '../../../contexts/modals'
import { accountAtom } from '../../../contexts/settings'
import { PasswordRegex } from '../../../utils/format'
import { Modal } from '../../base/Modal'

type ChangePasswordForm = {
  password0: string
  password1: string
  password2: string
}

interface ChangePasswordModalProps {
  open: boolean
  onClose: () => void
}

export const ChangePasswordModal = ({
  open,
  onClose,
}: ChangePasswordModalProps) => {
  const inputRef = useRef<HTMLInputElement>()

  const [modals, setModals] = useAtom(modalsAtom)
  const [account, setAccount] = useAtom(accountAtom)

  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)
  const [showPassword0, setShowPassword0] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)

  const [form, setForm] = useState<ChangePasswordForm>({
    password0: '',
    password1: '',
    password2: '',
  })

  useEffect(() => {
    if (!inputRef.current || !open) return
    inputRef.current?.focus()
  }, [open])

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault()

    if (form.password1 !== form.password2) {
      enqueueSnackbar('两次输入的密码不一致')
      return
    }

    if (form.password0 === form.password1) {
      enqueueSnackbar('新旧密码不能相同')
      return
    }

    setLoading(true)
    ky.post(`${prefix}/rest-auth/password/change/`, {
      json: {
        old_password: form.password0,
        new_password1: form.password1,
        new_password2: form.password2,
      },
      credentials: 'include',
    })
      .then(() => {
        enqueueSnackbar('修改密码成功，请重新登录')
        setLoading(false)
        setAccount(false)

        ky.post(`${prefix}/rest-auth/logout/`, { credentials: 'include' }).then(
          () => mutate(`${prefix}/api/user`)
        )

        onClose()
        setModals(modals => ({ ...modals, auth: '登录' }))
      })
      .catch((error: HTTPError) => {
        console.error(error)
        setLoading(false)
        error.response
          .json()
          .then((messages: { [key: string]: string }) =>
            Object.values(messages).forEach((message: string) =>
              enqueueSnackbar(`修改密码失败 - ${message}`)
            )
          )
      })
  }

  return (
    <Modal
      title="修改密码"
      subtitle="建议定期更换密码"
      fullWidth
      maxWidth={false}
      keepMounted
      open={open}
      onClose={onClose}
      sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
    >
      {open && (
        <Helmet>
          <title>修改密码 - {info.name}</title>
        </Helmet>
      )}

      <Stack
        component="form"
        spacing={1.5}
        onSubmit={handleChangePassword}
        sx={{ px: 2.5, pb: 2.5, alignItems: 'center' }}
      >
        <TextField
          inputRef={inputRef}
          type={showPassword0 ? 'text' : 'password'}
          required
          name="password0"
          label="旧的密码"
          size="small"
          fullWidth
          value={form.password0}
          autoComplete="current-password"
          color="secondary"
          onChange={e => setForm({ ...form, password0: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'} sx={{ mr: -1 }}>
                <IconButton
                  onClick={() => setShowPassword0(!showPassword0)}
                  tabIndex={-1}
                  sx={{ color: 'text.disabled' }}
                >
                  {showPassword0 ? (
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
          type={showPassword1 ? 'text' : 'password'}
          required
          name="password1"
          label="新的密码"
          size="small"
          fullWidth
          value={form.password1}
          autoComplete="new-password"
          helperText="8 到 24 个字符，且不能为纯数字"
          color="secondary"
          onChange={e => setForm({ ...form, password1: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'} sx={{ mr: -1 }}>
                <IconButton
                  onClick={() => setShowPassword1(!showPassword1)}
                  tabIndex={-1}
                  sx={{ color: 'text.disabled' }}
                >
                  {showPassword1 ? (
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
          type={showPassword1 ? 'text' : 'password'}
          required
          name="password2"
          label="再次输入密码"
          size="small"
          fullWidth
          value={form.password2}
          autoComplete="new-password"
          color="secondary"
          onChange={e => setForm({ ...form, password2: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'} sx={{ mr: -1 }}>
                <IconButton
                  onClick={() => setShowPassword1(!showPassword1)}
                  tabIndex={-1}
                  sx={{ color: 'text.disabled' }}
                >
                  {showPassword1 ? (
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
          color="secondary"
          sx={{ width: '100%', py: 0.75 }}
        >
          修改密码
        </LoadingButton>
      </Stack>
    </Modal>
  )
}
