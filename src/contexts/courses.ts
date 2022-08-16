import { type CourseColumnKey } from '../configs/courses/columns'
import { atomLocal, atomSession } from '../utils/addons'

type CoursesView = {
  columns: CourseColumnKey[]
  sort: {
    column: CourseColumnKey
    order: 'asc' | 'desc'
  }
}

export const coursesViewAtom = atomLocal<CoursesView>('courses-view', {
  columns: ['name', 'type', 'credit', 'period', 'nature', 'category'],
  sort: { column: 'name', order: 'desc' },
})

export type CoursesHistory = {
  id: number
  search?: string
  type?: string
  nature?: string
  credit?: string
  period?: string
}

export type CoursesHistories = CoursesHistory[]

export const coursesHistoryAtom = atomSession<CoursesHistories>(
  'courses-history',
  []
)
