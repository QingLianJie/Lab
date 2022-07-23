import { InsertChartRounded } from '@mui/icons-material'
import {
  Card,
  createTheme,
  Stack,
  ThemeProvider,
  useTheme,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { DataGrid } from '@mui/x-data-grid'
import { useAtom } from 'jotai'
import { scoresAtom } from '../../contexts/bridge/scores'
import { Fetch } from '../settings/Fetch'
import { zhCN } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: '课程', width: 180 },
  { field: 'term', headerName: '学期', width: 120 },
  { field: 'type', headerName: '类型', width: 60 },
  { field: 'credit', headerName: '学分', width: 60 },
  { field: 'period', headerName: '学时', width: 60 },
  { field: 'nature', headerName: '性质', width: 200 },
  { field: 'score', headerName: '成绩' },
]

export const List = () => {
  const [scores, setScores] = useAtom(scoresAtom)

  return (
    <Card variant="outlined">
      {scores ? (
        <Stack spacing={2}>
          <DataGrid
            autoHeight
            rows={scores.scores}
            columns={columns}
            pageSize={10}
            checkboxSelection
            rowsPerPageOptions={[10, 20, 50, 100]}
            localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
            sx={{ border: 'none' }}
          />
        </Stack>
      ) : (
        <Fetch name="成绩" icon={InsertChartRounded} />
      )}
    </Card>
  )
}
