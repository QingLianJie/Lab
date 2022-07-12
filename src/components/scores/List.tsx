import { Card, Stack, Typography } from '@mui/material'

export const List = () => {
  return (
    <Card variant="outlined">
      <Stack spacing={2} sx={{ px: 2, py: 1.5 }}>
        <Typography>成绩列表</Typography>
      </Stack>
    </Card>
  )
}
