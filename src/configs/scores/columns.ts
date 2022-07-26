export const columns = [
  { name: 'ID', id: 'id' },
  { name: '课程名称', id: 'name' },
  { name: '学期', id: 'term' },
  { name: '课程类型', id: 'type' },
  { name: '学分', id: 'credit' },
  { name: '学时', id: 'period' },
  { name: '考查方式', id: 'test' },
  { name: '课程性质', id: 'nature' },
  { name: '课程分类', id: 'category' },
  { name: '分数', id: 'score' },
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
