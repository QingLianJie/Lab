import { InsertChartOutlined } from '@mui/icons-material'
import { Card, Stack } from '@mui/material'
import { useAtomValue } from 'jotai'
import { scoresAtom } from '../../../contexts/scores'
import { HomeWidgetPlaceholder } from './Placeholder'

export const HomeScoresWidget = () => {
  const scores = useAtomValue(scoresAtom)

  return (
    <Card variant="outlined" sx={{ px: 2, py: 1.5 }}>
      {scores ? (
        <Stack>HomeWidgets</Stack>
      ) : (
        <HomeWidgetPlaceholder
          name="最近成绩"
          description="📊 查看最近出分的成绩"
          icon={InsertChartOutlined}
        />
      )}
    </Card>
  )
}
