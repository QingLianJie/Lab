import { type SvgIconComponent } from '@mui/icons-material'
import { Button, Icon, Stack, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { modalsAtom } from '../../../contexts/modals'
import { bridgeAtom, studentAtom } from '../../../contexts/bridge'
import { SettingsGoAction } from '../../settings/Fetch'

interface HomeWidgetPlaceholderProps {
  name: string
  description: string
  icon: SvgIconComponent
}

export const HomeWidgetPlaceholder = ({
  name,
  description,
  icon,
}: HomeWidgetPlaceholderProps) => {
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
    <Stack
      spacing={0.5}
      sx={{
        position: 'relative',
        flex: 1,
        height: '100%',
        px: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Stack spacing={0.5} sx={{ pt: 0.5, alignItems: 'flex-start' }}>
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            pb: 1,
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          🔒 获取数据后查看
        </Typography>
      </Stack>
      <Icon
        component={icon}
        sx={{
          position: 'absolute',
          right: 2,
          bottom: 2,
          width: 48,
          height: 48,
          color: 'action.selected',
          transition: 'color 0.2s',
        }}
      />
      <Stack direction="row" sx={{ pt: 0.5 }}>
        <Button
          variant="text"
          disableElevation
          color="info"
          onClick={handleFetch}
          sx={{
            ml: -1.25,
            mb: -0.5,
            minWidth: 'unset',
            py: 0.5,
            px: 1.25,
            textTransform: 'none',
            diaplay: 'flex',
            alignItems: 'center',
          }}
        >
          获取数据
        </Button>
      </Stack>
    </Stack>
  )
}
