import { Fragment } from 'react'
import { BindModal } from './settings/modals/Bind'
import { CaptchaModal } from './settings/modals/Captcha'
import { AccountModal } from './settings/modals/Account'

export const Modals = () => (
  <Fragment>
    <BindModal />
    <CaptchaModal />
    <AccountModal />
  </Fragment>
)
