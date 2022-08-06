import { atom } from 'jotai'
import { Course } from '..'

type CourseFilter = Partial<Course> & {
  learned?: boolean
}

export const coursesFilterAtom = atom<CourseFilter>({})
