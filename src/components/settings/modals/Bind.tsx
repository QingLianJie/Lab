import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { studentAtom } from '../../../contexts/bridge'
import { modalsAtom } from '../../../contexts/modals'
import { schedulesAtom } from '../../../contexts/schedules'
import { scoresAtom } from '../../../contexts/scores'
import { Modal } from '../../base/Modal'

export const BindModal = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const [student, setStudent] = useAtom(studentAtom)
  const [scores, setScores] = useAtom(scoresAtom)
  const [schedules, setSchedules] = useAtom(schedulesAtom)

  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (!inputRef.current || !modals.bind) return
    inputRef.current?.focus()
  }, [modals.bind])

  const handleCancel = () => setModals({ ...modals, bind: false })

  const [id, setId] = useState(student ? student.id : '')
  const [password, setPassword] = useState(student ? student.password : '')
  const [showPassword, setShowPassword] = useState(false)

  const handleBind = (e: FormEvent) => {
    e.preventDefault()
    setStudent({ id, password })
    setScores(false)
    setSchedules(false)
    handleCancel()
    enqueueSnackbar(`已添加 HEU 账号：${id}，请重新获取数据`)
  }

  const handleUnBind = () => {
    setStudent(false)
    setId('')
    setPassword('')
    setShowPassword(false)
    setScores(false)
    setSchedules(false)
    handleCancel()
    enqueueSnackbar(`已移除 HEU 账号：${id}`)
  }

  return (
    <Modal
      title="HEU 账号"
      subtitle="账号信息仅存于本地"
      fullWidth
      maxWidth={false}
      keepMounted
      open={modals.bind}
      onClose={handleCancel}
      sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
    >
      <Stack
        component="form"
        spacing={1.5}
        onSubmit={handleBind}
        sx={{ px: 2.5, pb: 2.5 }}
      >
        <TextField
          inputRef={inputRef}
          required
          name="id"
          label="学号"
          size="small"
          fullWidth
          autoFocus
          value={id}
          onChange={e => setId(e.target.value)}
        />

        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'} sx={{ mr: -1 }}>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  sx={{ color: 'text.disabled' }}
                >
                  {showPassword ? (
                    <VisibilityOutlined fontSize="small" />
                  ) : (
                    <VisibilityOffOutlined fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showPassword ? 'text' : 'password'}
          required
          name="password"
          label="密码"
          size="small"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '100%', mt: 1, py: 0.75 }}
        >
          {student ? '修改' : '添加'}账号
        </Button>
        {student && (
          <Button
            type="button"
            variant="outlined"
            color="primary"
            sx={{ width: '100%', mt: 1.5, py: 0.625 }}
            onClick={handleUnBind}
          >
            移除当前账号
          </Button>
        )}
      </Stack>
    </Modal>
  )
}
