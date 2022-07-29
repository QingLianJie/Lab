import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Typography,
} from '@mui/material'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { authTabs } from '../../../configs/settings/tabs'
import { modalsAtom } from '../../../contexts/booleans'

export const AccountModal = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const [title, setTitle] = useState('登录')

  useEffect(() => {
    if (modals.auth) setTitle(modals.auth)
  }, [modals.auth])

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={!!modals.auth}
      onClose={() => setModals({ ...modals, auth: false })}
      sx={{
        '& .MuiPaper-root': { maxWidth: '18rem' },
        '& .MuiDialogContent-root': { p: 0 },
      }}
    >
      <DialogTitle>
        <Typography
          component="p"
          variant="h6"
          sx={{ textAlign: 'center', pt: 3, pb: 0.5, fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          欢迎来到清廉街
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TabContext value={modals.auth || title}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={(e, v) => setModals({ ...modals, auth: v })}
              aria-label="登录、注册和重置密码的页面"
              sx={{ minHeight: 44, px: { xs: 2.5, sm: 3 } }}
            >
              {authTabs.map(tab => (
                <Tab
                  label={tab.name}
                  value={tab.name}
                  key={tab.name}
                  sx={{
                    ml: tab.name === '重置密码' ? 'auto' : 0,
                    minWidth: 'unset',
                    minHeight: 42,
                  }}
                />
              ))}
            </TabList>
          </Box>

          {authTabs.map(tab => (
            <TabPanel
              value={tab.name}
              key={tab.name}
              sx={{ px: 3, pt: 2, pb: 3 }}
            >
              <Box component={tab.component} />
            </TabPanel>
          ))}
        </TabContext>
      </DialogContent>
    </Dialog>
  )
}
