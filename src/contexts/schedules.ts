import { SchedulesAtom } from '..'
import { atomLocal } from '../utils/addons'

export const schedulesAtom = atomLocal<SchedulesAtom | false>(
  'schedules',
  false
)

type SchedulesView = {
  week: number
  start: string
}

export const schedulesViewAtom = atomLocal<SchedulesView>('schedules-view', {
  week: 1,
  start: '',
})
