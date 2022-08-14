import { atom } from 'jotai'
import { Course } from '..'

type CourseFilter = Partial<Course> & {
  learned?: boolean
}

export const coursesFilterAtom = atom<CourseFilter>({})

type CourseDetailsView = {
  statistics: string
}

export const courseDetailsViewAtom = atom<CourseDetailsView>({
  statistics: '所有时间',
})
