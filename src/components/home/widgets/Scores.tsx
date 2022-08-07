import { Card, Stack } from '@mui/material'
import { useAtomValue } from 'jotai'
import { scoresAtom } from '../../../contexts/scores'

export const HomeScoresWidget = () => {
  const scores = useAtomValue(scoresAtom)

  return (
    <Card variant="outlined">
      <Stack sx={{ px: 2, py: 1.5 }}>最近成绩</Stack>
    </Card>
  )
}
