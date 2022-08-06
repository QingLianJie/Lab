import { TableChartRounded } from '@mui/icons-material'
import { createTheme, Stack, ThemeProvider, useTheme } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useAtomValue } from 'jotai'
import { Layout } from '../components/Layout'
import { SchedulesDetails } from '../components/schedules/Details'
import { SchedulesTable } from '../components/schedules/Table'
import { SchedulesToolBar } from '../components/schedules/ToolBar'
import { schedulesAtom } from '../contexts/schedules'

export const SchedulesPage = () => {
  const schedules = useAtomValue(schedulesAtom)

  const theme = useTheme()
  const { palette } = theme

  const schedulesTheme = createTheme({
    ...theme,
    palette: { ...palette, primary: blue },
  })

  return (
    <ThemeProvider theme={schedulesTheme}>
      <Layout
        title="课表"
        subtitle="查看自己的学期课表"
        icon={TableChartRounded}
        color={blue[400]}
      >
        <Stack spacing={2} sx={{ flex: 1 }}>
          {schedules && <SchedulesToolBar />}
          <SchedulesTable />
        </Stack>
        <SchedulesDetails />
      </Layout>
    </ThemeProvider>
  )
}
