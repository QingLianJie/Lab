import { amber, green, red } from '@mui/material/colors'
import { isNumber } from 'lodash'

export const scoreMap = (score: number | string) => {
  if (isNumber(score)) return score

  switch (score) {
    case '优秀':
      return 95
    case '良好':
      return 85
    case '中等':
      return 75
    case '及格':
      return 65
    case '不及格':
      return 30
    default:
      return 0
  }
}

export const scoreColor = (score: number) => {
  if (score >= 90) return green[400]
  if (score >= 60) return 'text.primary'
  if (score === 0) return amber[400]
  return red[400]
}

const numberMap = ['零', '一', '二', '三', '四', '五', '六']
const termMap = ['', '上', '下']

export const termName = (start: number, id: string) => {
  const [from, to, term] = id.split('-')
  if (!from || !to || !term) return ''
  const year = Number(from)
  const part = Number(term)
  if (isNaN(year) || isNaN(part)) return ''
  return `大${numberMap[year - start + 1]}${termMap[part]}`
}
