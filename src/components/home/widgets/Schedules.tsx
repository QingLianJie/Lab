import { Card, Stack } from '@mui/material'
import { useAtomValue } from 'jotai'
import { schedulesAtom } from '../../../contexts/schedules'

export const HomeSchedulesWidget = () => {
  const schedules = useAtomValue(schedulesAtom)

  return (
    <Card variant="outlined">
      <Stack sx={{ px: 2, py: 1.5 }}>今日课表</Stack>
    </Card>
  )
}
