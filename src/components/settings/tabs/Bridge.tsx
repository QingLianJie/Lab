import { SchoolOutlined, SchoolRounded } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { studentAtom } from '../../../contexts/bridge'
import { modalsAtom } from '../../../contexts/modals'
import { SettingsHeader } from '../Header'

export const SettingsBridge = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const student = useAtomValue(studentAtom)

  return (
    <Fragment>
      <SettingsHeader
        title="HEU 账号"
        help="/settings?tab=help#bridge"
        icon={SchoolOutlined}
      />
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
        <SchoolRounded
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            color: student ? 'primary.main' : 'action.selected',
            transition: 'color 0.2s',
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
          <Fragment>
            <Typography
              variant="h6"
              component="span"
              sx={{
                color: 'text.primary',
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              未添加 HEU 账号
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ color: 'text.secondary', textAlign: 'center' }}
            >
              保存 HEU 账号到本地浏览器
            </Typography>
          </Fragment>
        )}

        <Stack direction="row" sx={{ py: 1 }}>
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
            {student ? '修改账号' : '添加账号'}
          </Button>
        </Stack>
      </Stack>
    </Fragment>
  )
}
