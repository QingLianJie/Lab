import { Card, Stack, Typography } from '@mui/material'

export const CourseDetailsStackChart = () => (
  <Card variant="outlined">
    <Stack sx={{ width: '100%', py: 2, px: 2.25, alignItems: 'flex-start' }}>
      <Typography
        variant="body1"
        sx={{ color: 'text.primary', fontWeight: 700 }}
      >
        成绩统计
      </Typography>
    </Stack>
  </Card>
)
