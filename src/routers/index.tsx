import { InboxRounded } from '@mui/icons-material'
import { Layout } from '../components/Layout'

export const HomePage = () => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const day = new Date().getDay()
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()

  return (
    <Layout
      subtitle={`今天是 ${month} 月 ${date} 日，${weekdays[day]}`}
      icon={InboxRounded}
    ></Layout>
  )
}
