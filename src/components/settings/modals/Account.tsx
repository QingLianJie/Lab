import { Box } from '@mui/material'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { info } from '../../../configs/site-info'
import { modalsAtom } from '../../../contexts/modals'
import { Modal } from '../../base/Modal'
import { AuthLogin } from './auth/Login'
import { AuthRegister } from './auth/Register'
import { AuthResetPassword } from './auth/ResetPassword'

const pages = [
  { name: '登录', component: AuthLogin },
  { name: '注册', component: AuthRegister },
  { name: '重置密码', component: AuthResetPassword },
]

export const AccountModal = () => {
  const [modals, setModals] = useAtom(modalsAtom)

  return (
    <Fragment>
      {pages.map(page => (
        <Modal
          key={page.name}
          title={page.name}
          subtitle={
            page.name === '重置密码'
              ? '忘记密码可以在这里重置'
              : '欢迎来到清廉街'
          }
          fullWidth
          maxWidth={false}
          keepMounted
          open={modals.auth === page.name}
          onClose={() => setModals(modals => ({ ...modals, auth: false }))}
          sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
        >
          {modals.auth === page.name && (
            <Helmet>
              <title>
                {page.name} - {info.name}
              </title>
            </Helmet>
          )}
          <Box component={page.component} />
        </Modal>
      ))}
    </Fragment>
  )
}
