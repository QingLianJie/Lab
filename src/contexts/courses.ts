import { type CourseColumnKey } from '../configs/courses/columns'
import { atomLocal, atomSession } from '../utils/addons'

type CoursesView = {
  columns: CourseColumnKey[]
}

export const coursesViewAtom = atomLocal<CoursesView>('courses-view', {
  columns: [
    'id',
    'name',
    'type',
    'credit',
    'period',
    'test',
    'nature',
    'category',
  ],
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
