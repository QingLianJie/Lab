import { RefreshOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { modalsAtom } from '../../../contexts/booleans'
import { bridgeAtom, studentAtom } from '../../../contexts/bridge'
import { Tooltip } from '../../base/Tooltip'
import { SettingsGoAction } from '../../settings/Fetch'

export const SchedulesUpdateAction = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const bridge = useAtomValue(bridgeAtom)
  const student = useAtomValue(studentAtom)

  const handleFetch = () => {
    if (!bridge)
      enqueueSnackbar('未安装插件，请前往设置页面安装', {
        action: <SettingsGoAction name="extension" />,
      })
    else if (!student)
      enqueueSnackbar('未添加 HEU 账号，请前往设置页面添加', {
        action: <SettingsGoAction name="bridge" />,
      })
    else setModals({ ...modals, captcha: true })
  }

  return (
    <Tooltip title="重新获取数据" arrow placement="top">
      <IconButton
        aria-label="重新获取数据"
        sx={{
          color: 'text.disabled',
          '&:hover': { color: 'text.primary' },
          transition: 'all 0.2s',
        }}
        onClick={handleFetch}
      >
        <RefreshOutlined />
      </IconButton>
    </Tooltip>
  )
}
