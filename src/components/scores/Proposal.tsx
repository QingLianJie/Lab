import { Card, Stack, Typography } from '@mui/material'

export const Proposal = () => {
  return (
    <Card variant="outlined">
      <Stack spacing={2} sx={{ px: 2, py: 1.5 }}>
        <Typography
          variant="body1"
          component="span"
          sx={{ color: 'text.secondary', textAlign: 'center', py: 1 }}
        >
          此处应有培养方案及学分统计，但还没做
        </Typography>
      </Stack>
    </Card>
  )
}
