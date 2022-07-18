import { InsertChartRounded } from '@mui/icons-material'
import { Card, Stack, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { scoresAtom } from '../../contexts/bridge/scores'
import { Fetch } from '../settings/Fetch'

export const List = () => {
  const [scores, setScores] = useAtom(scoresAtom)

  return (
    <Card variant="outlined">
      {scores ? (
        <Stack spacing={2} sx={{ px: 2, py: 1.5 }}>
          <Typography>成绩列表</Typography>
        </Stack>
      ) : (
        <Fetch name="成绩" icon={InsertChartRounded} />
      )}
    </Card>
  )
}
