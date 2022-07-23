import { Fragment } from 'react'
import { Bind } from './settings/modals/Bind'
import { Captcha } from './settings/modals/Captcha'
import { Login } from './settings/modals/Login'

export const Modals = () => (
  <Fragment>
    <Bind />
    <Captcha />
    <Login />
  </Fragment>
)
