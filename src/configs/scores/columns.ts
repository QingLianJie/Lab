export const columns: {
  name: string
  id: ColumnsType
  number?: boolean
  score?: boolean
  header?: string
  bold?: boolean
  width: number
}[] = [
  { name: 'ID', id: 'id', width: 48 },
  { name: '课程名称', id: 'name', header: '名称', bold: true, width: 120 },
  { name: '学期', id: 'term', width: 48 },
  { name: '课程类型', id: 'type', header: '类型', width: 24 },
  { name: '学分', id: 'credit', number: true, width: 24 },
  { name: '学时', id: 'period', number: true, width: 24 },
  { name: '考查方式', id: 'test', header: '考查', width: 24 },
  { name: '课程性质', id: 'nature', header: '性质', width: 96 },
  { name: '课程分类', id: 'category', header: '分类', width: 96 },
  { name: '分数', id: 'score', number: true, score: true, width: 48 },
]

export type ColumnsType =
  | 'id'
  | 'name'
  | 'term'
  | 'type'
  | 'test'
  | 'credit'
  | 'period'
  | 'nature'
  | 'score'
  | 'category'
