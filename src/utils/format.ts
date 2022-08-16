import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import calendar from 'dayjs/plugin/calendar'
import relative from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(calendar)
dayjs.extend(relative)

export const calendarTime = (time: string | number) =>
  dayjs(time).calendar(dayjs(), {
    sameDay: '[今天] HH:mm',
    nextDay: '[明天] HH:mm',
    nextWeek: 'YYYY 年 M 月 D 日 HH:mm',
    lastDay: '[昨天] HH:mm',
    lastWeek: 'YYYY 年 M 月 D 日 HH:mm',
    sameElse: 'YYYY 年 M 月 D 日 HH:mm',
  })

export const calendarDate = (time: string) =>
  dayjs(time).calendar(dayjs(), {
    sameDay: '[今天]',
    nextDay: '[明天]',
    nextWeek: 'YYYY 年 M 月 D 日',
    lastDay: '[昨天]',
    lastWeek: 'YYYY 年 M 月 D 日',
    sameElse: 'YYYY 年 M 月 D 日',
  })

export const calendarAuto = (time: string) =>
  dayjs(time).calendar(dayjs(), {
    sameDay: '[今天] HH:mm',
    nextDay: '[明天] HH:mm',
    nextWeek: 'YYYY 年 M 月 D 日',
    lastDay: '[昨天] HH:mm',
    lastWeek: 'YYYY 年 M 月 D 日',
    sameElse: 'YYYY 年 M 月 D 日',
  })

export const relativeTime = (time: string) => dayjs(time).fromNow()

export const byteFormat = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const formatNumbers = (nums: number[]) => {
  const arrs: number[][] = []
  nums.forEach((num, index) => {
    if (index - 1 < 0) {
      arrs.push([num])
      return
    }
    if (num - 1 === nums[index - 1]) arrs[arrs.length - 1].push(num)
    else arrs.push([num])
  })
  return arrs
}

export const NameRegex = '^.{3,16}$'
export const EmailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const PasswordRegex = '^.*(?=.{8,24})(?=.*[A-Za-z!@#$%^&*?]).*$'

export const removeEmpty = <T>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v))
