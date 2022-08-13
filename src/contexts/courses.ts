import { atom } from 'jotai'
import { Course } from '..'

type CourseFilter = Partial<Course> & {
  learned?: boolean
}

export const coursesFilterAtom = atom<CourseFilter>({})

type CourseDetailsView = {
  statistics: string
  comments: '清廉街' | '腐败街'
}

export const courseDetailsViewAtom = atom<CourseDetailsView>({
  statistics: '所有时间',
  comments: '清廉街',
})
