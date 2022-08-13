import { type SvgIconComponent, WarningRounded } from '@mui/icons-material'
import {
  Card,
  Stack,
  Icon,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'

interface ErrorCardProps {
  icon?: SvgIconComponent
  title?: string
  description?: string
}

export const ErrorCard = ({ icon, title, description }: ErrorCardProps) => (
  <Card
    variant="outlined"
    sx={{ px: 2, py: 1.5, flex: 1, display: 'flex', alignItems: 'center' }}
  >
    <Stack
      spacing={0.5}
      sx={{
        flex: 1,
        height: '100%',
        px: { xs: 2.5, md: 3 },
        py: { xs: 8, md: 8 },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon
        component={icon || WarningRounded}
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
        {title || '获取数据失败'}
      </Typography>
      <Typography
        variant="body1"
        component="span"
        sx={{ color: 'text.secondary', textAlign: 'center' }}
      >
        {description || '请检查网络，或者稍后再试'}
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
          onClick={() => location.reload()}
        >
          重新加载
        </Button>
      </Stack>
    </Stack>
  </Card>
)

export const LoadingCard = () => (
  <Card
    variant="outlined"
    sx={{ px: 2, py: 1.5, flex: 1, display: 'flex', alignItems: 'center' }}
  >
    <Stack
      spacing={0.5}
      sx={{
        flex: 1,
        height: '100%',
        px: { xs: 2.5, md: 3 },
        py: { xs: 8, md: 8 },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={48} thickness={4} />
    </Stack>
  </Card>
)
