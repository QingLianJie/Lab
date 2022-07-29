import { ClassRounded } from '@mui/icons-material'
import { red } from '@mui/material/colors'
import { Layout } from '../components/Layout'

export const CoursesPage = () => (
  <Layout
    title="课程"
    subtitle="筛选和查看课程数据"
    icon={ClassRounded}
    color={red[400]}
  ></Layout>
)
