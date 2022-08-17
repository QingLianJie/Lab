export const columns: CourseColumns = [
  { name: 'ID', id: 'id', width: 120 },
  { name: '课程名称', id: 'name', header: '名称', width: 280 },
  { name: '课程类型', id: 'type', header: '类型', width: 64 },
  { name: '学分', id: 'credit', number: true, width: 64 },
  { name: '学时', id: 'period', number: true, width: 64 },
  { name: '考查方式', id: 'test', header: '考查', width: 64 },
  { name: '课程性质', id: 'nature', header: '性质', width: 200 },
  { name: '课程分类', id: 'category', header: '分类', width: 200 },
]

export type CourseColumnKey =
  | 'name'
  | 'id'
  | 'type'
  | 'category'
  | 'test'
  | 'credit'
  | 'period'
  | 'nature'

export type CourseColumn = {
  name: string
  id: CourseColumnKey
  number?: boolean
  header?: string
  width: number
}

export type CourseColumns = CourseColumn[]
