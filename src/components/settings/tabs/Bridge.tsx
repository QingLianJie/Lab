import { SchoolOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { Fragment } from 'react'
import { modalsAtom } from '../../../contexts/states'
import { SettingsHeader } from '../Header'

export const Bridge = () => {
  const [modals, setModals] = useAtom(modalsAtom)

  return (
    <Fragment>
      <SettingsHeader title="HEU 账号" help="/settings?tab=help#bridge" />
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
        <SchoolOutlined
          sx={{ width: 108, height: 108, mb: 2, color: 'action.selected' }}
        />
        <Typography
          variant="h6"
          component="span"
          sx={{ color: 'text.disabled', textAlign: 'center' }}
        >
          当前没有添加 HEU 账号
        </Typography>
        <Stack direction="row" sx={{ pb: 1 }}>
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
              setModals({ ...modals, bind: true })
              enqueueSnackbar('还没做')
            }}
          >
            添加 HEU 账号
          </Button>
        </Stack>
      </Stack>
    </Fragment>
  )
}
