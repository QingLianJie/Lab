import { TableChartRounded } from '@mui/icons-material'
import {
  useTheme,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  Stack,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { Layout } from '../components/Layout'
import { SchedulesTable } from '../components/schedules/Table'
import { SchedulesToolBar } from '../components/schedules/ToolBar'

export const SchedulesPage = () => {
  const theme = useTheme()
  const { palette, breakpoints } = theme
  const isMobile = useMediaQuery(breakpoints.down('sm'))

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
        <Stack spacing={2}>
          <SchedulesToolBar />
          <SchedulesTable />
        </Stack>
      </Layout>
    </ThemeProvider>
  )
}
