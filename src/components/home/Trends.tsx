import { WarningRounded } from '@mui/icons-material'
import { Button, Card, Stack, Typography } from '@mui/material'

export const HomeTrends = () => (
  <Card variant="outlined" sx={{ px: 2, py: 1.5, flex: 1 }}>
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
      <WarningRounded
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
        功能开发中
      </Typography>
      <Typography
        variant="body1"
        component="span"
        sx={{ color: 'text.secondary', textAlign: 'center' }}
      >
        展示最近热点课程及评论
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
          onClick={() => window.location.reload()}
        >
          重新加载
        </Button>
      </Stack>
    </Stack>
  </Card>
)
