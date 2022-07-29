import { TableChartRounded } from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import { Layout } from '../components/Layout'

export const SchedulesPage = () => (
  <Layout
    title="课表"
    subtitle="查看自己的学期课表"
    icon={TableChartRounded}
    color={blue[400]}
  ></Layout>
)
