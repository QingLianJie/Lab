import { SchedulesAtom } from '../..'
import { atomLocal } from '../../utils/atom'

export const schedulesAtom = atomLocal<SchedulesAtom | false>(
  'schedules',
  false
)
