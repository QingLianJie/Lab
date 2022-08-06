import { TableChartOutlined } from '@mui/icons-material'
import { Card, Stack } from '@mui/material'
import { useAtomValue } from 'jotai'
import { schedulesAtom } from '../../../contexts/schedules'
import { HomeWidgetPlaceholder } from './Placeholder'

export const HomeSchedulesWidget = () => {
  const schedules = useAtomValue(schedulesAtom)

  return (
    <Card variant="outlined" sx={{ px: 2, py: 1.5 }}>
      {schedules ? (
        <Stack>HomeWidgets</Stack>
      ) : (
        <HomeWidgetPlaceholder
          name="今日课表"
          description="📅 查看今天的课程信息"
          icon={TableChartOutlined}
        />
      )}
    </Card>
  )
}
