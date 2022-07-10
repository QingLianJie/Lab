import { AccountCircleOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { info } from '../../../configs/site-info'
import { AuthModal, modalsAtom } from '../../../contexts/booleans'
import { SettingsHeader } from '../Header'

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
                setModals({ ...modals, auth: action as AuthModal })
              }
              key={action}
            >
              {action}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Fragment>
  )
}
