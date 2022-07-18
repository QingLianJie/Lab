import { AccountCircleRounded } from '@mui/icons-material'
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
          component="span"
          sx={{ color: 'text.primary', textAlign: 'center', fontWeight: 700 }}
        >
          未登录{info.name}账号
        </Typography>

        <Typography
          variant="body1"
          component="span"
          sx={{ color: 'text.secondary', textAlign: 'center' }}
        >
          登录后可以上传成绩和发表评论
        </Typography>
        <Stack direction="row" sx={{ py: 1 }}>
          {['登录', '注册'].map(action => (
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
