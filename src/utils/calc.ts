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
