import { SchoolOutlined } from '@mui/icons-material'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { amber } from '@mui/material/colors'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { modalsAtom } from '../../../contexts/booleans'
import { studentAtom } from '../../../contexts/bridge'
import { SettingsHeader } from '../Header'

export const Bridge = () => {
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  const [modals, setModals] = useAtom(modalsAtom)
  const student = useAtomValue(studentAtom)

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
          sx={{
            width: 108,
            height: 108,
            mb: 2,
            color: student ? amber[isDark ? 500 : 600] : 'action.selected',
          }}
        />

        {student ? (
          <Fragment>
            <Typography
              variant="body1"
              component="span"
              sx={{ color: 'text.secondary', textAlign: 'center' }}
            >
              已添加 HEU 账号
            </Typography>
            <Typography
              variant="h5"
              component="span"
              sx={{
                color: 'text.primary',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              {student.id}
            </Typography>
          </Fragment>
        ) : (
          <Typography
            variant="h6"
            component="span"
            sx={{ color: 'text.disabled', textAlign: 'center' }}
          >
            当前没有添加 HEU 账号
          </Typography>
        )}

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
            onClick={() => setModals({ ...modals, bind: true })}
          >
            {student ? '修改' : '添加'} HEU 账号
          </Button>
        </Stack>
      </Stack>
    </Fragment>
  )
}
