import { Fragment } from 'react'
import { Bind } from './settings/modals/Bind'
import { Captcha } from './settings/modals/Captcha'
import { Account } from './settings/modals/Account'

export const Modals = () => (
  <Fragment>
    <Bind />
    <Captcha />
    <Account />
  </Fragment>
)
