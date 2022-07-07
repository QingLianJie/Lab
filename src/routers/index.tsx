import { InboxOutlined } from '@mui/icons-material'
import { Layout } from '../components/Layout'

export const HomePage = () => {
  const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()
  const day = new Date().getDay() - 1

  return (
    <Layout
      subtitle={`今天是 ${month} 月 ${date} 日，${weekdays[day]}`}
      icon={InboxOutlined}
    ></Layout>
  )
}
