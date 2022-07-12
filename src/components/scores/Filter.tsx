import { Card, Stack, Typography } from '@mui/material'

export const Filter = () => {
  return (
    <Card variant="outlined">
      <Stack spacing={2} sx={{ px: 2, py: 1.5 }}>
        <Typography>成绩筛选</Typography>
      </Stack>
    </Card>
  )
}
