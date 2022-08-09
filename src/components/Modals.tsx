import { Fragment } from 'react'
import { BindModal } from './settings/modals/Bind'
import { CaptchaModal } from './settings/modals/Captcha'
import { AccountModal } from './settings/modals/Account'
import { Thanks } from './scores/Tips'
import { SchedulesCalendarModal } from './schedules/actions/Calendar'

export const Modals = () => (
  <Fragment>
    <BindModal />
    <CaptchaModal />
    <AccountModal />
    <Thanks />
    <SchedulesCalendarModal />
  </Fragment>
)
