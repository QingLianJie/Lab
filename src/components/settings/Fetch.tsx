import {
  AddCircleRounded,
  LocalCafeOutlined,
  type SvgIconComponent,
} from '@mui/icons-material'
import { Button, Icon, Stack, Typography } from '@mui/material'

interface FetchProps {
  name: '成绩' | '课表'
  icon: SvgIconComponent
}

export const Fetch = ({ name, icon }: FetchProps) => {
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
