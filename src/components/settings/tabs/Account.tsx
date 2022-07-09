import { AccountCircleOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { Fragment } from 'react'
import { info } from '../../../configs/site-info'
import { modalsAtom } from '../../../contexts/states'
import { SettingsHeader } from '../Header'

const actions = [
  {
    name: '登录',
    id: 'login',
  },
  {
    name: '注册',
    id: 'register',
  },
  {
    name: '重置密码',
    id: 'reset',
  },
]

export const Account = () => {
  const [modals, setModals] = useAtom(modalsAtom)

  return (
    <Fragment>
      <SettingsHeader
        title={`${info.name}账号`}
        help="/settings?tab=help#account"
      />

      <Stack
        spacing={0.5}
        sx={{
          flex: 1,
          height: '100%',
          px: { xs: 2.5, md: 3 },
          py: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AccountCircleOutlined
          sx={{ width: 108, height: 108, mb: 2, color: 'action.selected' }}
        />
        <Typography
          variant="h6"
          component="span"
          sx={{ color: 'text.disabled', textAlign: 'center' }}
        >
          当前没有登录{info.name}账号
        </Typography>
        <Stack direction="row" sx={{ pb: 1 }}>
          {actions.map(action => (
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
              onClick={() => {
                setModals({ ...modals, [action.id]: true })
                enqueueSnackbar('还没做')
              }}
              key={action.name}
            >
              {action.name}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Fragment>
  )
}
