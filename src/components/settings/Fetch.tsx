import {
  ArrowForwardOutlined,
  type SvgIconComponent,
} from '@mui/icons-material'
import { Button, Icon, IconButton, Stack, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { modalsAtom } from '../../contexts/booleans'
import { bridgeAtom, studentAtom } from '../../contexts/bridge'

interface FetchProps {
  name: '成绩' | '课表'
  icon: SvgIconComponent
}

export const Fetch = ({ name, icon }: FetchProps) => {
  const navigate = useNavigate()

  const [modals, setModals] = useAtom(modalsAtom)
  const bridge = useAtomValue(bridgeAtom)
  const student = useAtomValue(studentAtom)

  const handleFetch = () => {
    if (!bridge)
      enqueueSnackbar('未安装插件，请前往设置页面安装', {
        action: () => (
          <IconButton
            aria-label="前往"
            sx={{ color: 'inherit', fontSize: '0.925rem' }}
            onClick={() => navigate('/settings?tab=extension')}
          >
            <ArrowForwardOutlined />
          </IconButton>
        ),
      })
    else if (!student)
      enqueueSnackbar('未添加 HEU 账号，请前往设置页面添加', {
        action: () => (
          <IconButton
            aria-label="前往"
            sx={{ color: 'inherit', fontSize: '0.925rem' }}
            onClick={() => navigate('/settings?tab=bridge')}
          >
            <ArrowForwardOutlined />
          </IconButton>
        ),
      })
    else setModals({ ...modals, captcha: true })
  }

  return (
    <Stack
      spacing={0.5}
      sx={{
        flex: 1,
        height: '100%',
        px: { xs: 2.5, md: 3 },
        py: { xs: 8, md: 12 },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon
        component={icon}
        sx={{
          width: 120,
          height: 120,
          my: 2,
          color: 'action.selected',
          transition: 'color 0.2s',
        }}
      />

      <Typography
        variant="h6"
        component="span"
        sx={{
          color: 'text.primary',
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        未获取{name}数据
      </Typography>
      <Typography
        variant="body1"
        component="span"
        sx={{ color: 'text.secondary', textAlign: 'center' }}
      >
        点击下方按钮从学校网站获取{name}数据
      </Typography>
      <Stack direction="row" sx={{ py: 1 }}>
        <Button
          variant="text"
          disableElevation
          color="info"
          onClick={handleFetch}
          sx={{
            minWidth: 'unset',
            py: 0.75,
            px: 1.5,
            textTransform: 'none',
          }}
        >
          获取数据
        </Button>
      </Stack>
    </Stack>
  )
}