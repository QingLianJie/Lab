import {
  AccountCircleOutlined,
  AccountCircleRounded,
  DeleteOutlineOutlined,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import ky, { type HTTPError } from 'ky'
import { enqueueSnackbar } from 'notistack'
import { Fragment, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSWRConfig } from 'swr'
import { info, ninja, prefix } from '../../../configs/site-info'
import { modalsAtom, type AuthModal } from '../../../contexts/modals'
import { accountAtom, settingsAtom } from '../../../contexts/settings'
import { Tooltip } from '../../base/styled/Tooltip'
import { SettingsHeader } from '../Header'
import { ChangePasswordModal } from '../modals/ChangePassword'
import { EditAvatarModal } from '../modals/EditAvatar'
import {
  SettingsAccountComments,
  SettingsAccountCommentsError,
  SettingsAccountCommentsLoading,
} from './account/Comments'

export const SettingsAccount = () => {
  const settings = useAtomValue(settingsAtom)
  const [openAvatar, setOpenAvatar] = useState(false)
  const [openPassword, setOpenPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [account, setAccount] = useAtom(accountAtom)
  const { mutate } = useSWRConfig()

  const handleLogout = () => {
    ky.delete(`${settings.developer.api || ninja}/api/auth/logout/`, {
      credentials: 'include',
    }).then(() => {
      enqueueSnackbar('已退出登录')
      mutate(`${settings.developer.api || ninja}/api/user/me/`)
      setAccount(false)
    })
  }

  const handleDeleteAccount = () => {
    if (!account) return
    const ans = prompt(
      '确认删除清廉街账号？删除后将无法恢复，请在输入框中输入你的邮箱来确认！'
    )

    if (!ans) return
    if (ans !== account.email) {
      enqueueSnackbar('邮箱输入错误，请检查')
      return
    }

    setLoading(true)
    ky.delete(`${settings.developer.api || ninja}/api/user/delete/user/`, {
      credentials: 'include',
    })
      .then(() => {
        setLoading(false)
        enqueueSnackbar('已删除账号，感谢使用清廉街')
        mutate(`${settings.developer.api || ninja}/api/user/me/`)
        setAccount(false)
      })
      .catch((error: HTTPError) => {
        console.error(error)
        setLoading(false)
        error.response
          .json()
          .then((messages: { [key: string]: string }) =>
            Object.values(messages).forEach((message: string) =>
              enqueueSnackbar(`删除账号失败 - ${message}`)
            )
          )
      })
  }

  return (
    <Fragment>
      <SettingsHeader
        title={`${info.name}账号`}
        help="/settings?tab=help#account"
        icon={AccountCircleOutlined}
      />

      {account ? (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          divider={
            <Divider
              orientation="vertical"
              sx={{
                height: { xs: 'auto', md: '100%' },
                width: { xs: '100%', md: 'auto' },
                borderBottomWidth: { xs: 1, md: 0 },
                borderBottomColor: 'divider',
              }}
            />
          }
          sx={{ alignItems: 'flex-start', height: '100%' }}
        >
          <Stack
            sx={{
              flex: { xs: 0, md: 1 },
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack
              spacing={{ xs: 2.75, md: 4 }}
              direction={{ xs: 'row', md: 'column' }}
              sx={{
                width: '100%',
                height: '100%',
                px: 2.75,
                py: 4,
                alignItems: 'center',
                justifyContent: { xs: 'flex-start', md: 'center' },
              }}
            >
              <EditAvatarModal
                open={openAvatar}
                onClose={() => setOpenAvatar(false)}
              />
              <Tooltip title="修改头像" arrow placement="top">
                <Box
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: '50%',
                    boxShadow: '0 0.75rem 3rem rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Avatar
                    src={
                      account && account.avatar
                        ? `${settings.developer.api || ninja}${account.avatar}`
                        : undefined
                    }
                    alt={account ? account.name : '未登录'}
                    onClick={() => setOpenAvatar(true)}
                    sx={{
                      backgroundColor: 'background.subtle',
                      width: { xs: 96, sm: 108, md: 150 },
                      height: { xs: 96, sm: 108, md: 150 },
                      cursor: 'pointer',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'text.disabled',
                        fontSize: { xs: 36, sm: 42, md: 64 },
                        fontWeight: 700,
                      }}
                    >
                      {account.name.slice(0, 1)}
                    </Typography>
                  </Avatar>
                </Box>
              </Tooltip>
              <Stack
                spacing={0.5}
                sx={{ alignItems: { xs: 'flex-start', md: 'center' } }}
              >
                <Typography variant="h5" component="p" sx={{ fontWeight: 700 }}>
                  {account.name}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', pb: 1 }}
                >
                  {account.email || '无邮箱'}
                </Typography>
                <Chip
                  label={`UID ${account.id}`}
                  size="small"
                  sx={{
                    fontSize: 'caption.fontSize',
                    fontWeight: 700,
                    height: 'auto',
                    px: 0,
                    py: 0.1,
                  }}
                />
              </Stack>
            </Stack>

            <Stack
              direction="row"
              sx={{
                width: '100%',
                pt: { xs: 0, md: 2 },
                px: 1.625,
                pb: 1.5,
                flex: 1,
                alignItems: 'flex-end',
              }}
            >
              <Stack direction="row" sx={{ flex: 1 }}>
                <ChangePasswordModal
                  open={openPassword}
                  onClose={() => setOpenPassword(false)}
                />
                <Button onClick={() => setOpenPassword(true)}>修改密码</Button>
                <Button onClick={handleLogout}>退出登录</Button>
              </Stack>

              <LoadingButton
                color="error"
                startIcon={<DeleteOutlineOutlined />}
                loading={loading}
                onClick={handleDeleteAccount}
              >
                删除账号
              </LoadingButton>
            </Stack>
          </Stack>
          <Stack sx={{ flex: 1, width: '100%', height: '100%' }}>
            <ErrorBoundary fallback={<SettingsAccountCommentsError />}>
              <Suspense fallback={<SettingsAccountCommentsLoading />}>
                <SettingsAccountComments />
              </Suspense>
            </ErrorBoundary>
          </Stack>
        </Stack>
      ) : (
        <Login />
      )}
    </Fragment>
  )
}

const Login = () => {
  const [modals, setModals] = useAtom(modalsAtom)

  return (
    <Stack
      spacing={0.5}
      sx={{
        flex: 1,
        height: '100%',
        px: { xs: 2.5, md: 3 },
        py: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AccountCircleRounded
        sx={{
          width: 120,
          height: 120,
          mb: 2,
          color: false ? 'primary.main' : 'action.selected',
          transition: 'color 0.2s',
        }}
      />
      <Typography
        variant="h6"
        component="p"
        sx={{ color: 'text.primary', textAlign: 'center', fontWeight: 700 }}
      >
        未登录{info.name}账号
      </Typography>

      <Typography
        variant="body1"
        component="p"
        sx={{ color: 'text.secondary', textAlign: 'center' }}
      >
        登录后可以上传成绩和发表评论
      </Typography>
      <Stack direction="row" sx={{ py: 1 }}>
        {['登录', '注册', '重置密码'].map(action => (
          <Button
            variant="text"
            disableElevation
            color="info"
            sx={{
              minWidth: 'unset',
              py: 0.75,
              px: 1.5,
              textTransform: 'none',
            }}
            onClick={() =>
              setModals(modals => ({ ...modals, auth: action as AuthModal }))
            }
            key={action}
          >
            {action}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}
