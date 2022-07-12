import {
  Card,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

export const Stats = () => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  return (
    <Card variant="outlined">
      <Stack
        direction={{ xs: 'row', sm: 'column' }}
        divider={
          <Divider
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{ height: isMobile ? 'auto' : 'auto' }}
          />
        }
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
          sx={{ width: '100%', flex: { xs: 2, sm: 1 } }}
        >
          <StatCard title="已选课程" content="24" />
          <StatCard title="已选学分" content="34.5" />
        </Stack>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
          sx={{ width: '100%', flex: 1 }}
        >
          <StatCard title="加权平均分" content="85.23" />
          {!isMobile && <StatCard title="优秀 / 挂科" content="12 / 0" />}
        </Stack>
      </Stack>
    </Card>
  )
}

interface StatCardProps {
  title: string
  content: string
}

const StatCard = ({ title, content }: StatCardProps) => (
  <Stack spacing={1} sx={{ p: 2, flex: 1, width: '100%' }}>
    <Typography
      variant="body2"
      component="span"
      sx={{ color: 'text.secondary' }}
    >
      {title}
    </Typography>

    <Typography
      variant="h5"
      component="span"
      sx={{
        fontWeight: 700,
        fontSize: {
          xs: '1.25rem',
          sm: '1.5rem',
        },
      }}
    >
      {content}
    </Typography>
  </Stack>
)
