import { LoadingButton } from '@mui/lab'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Score, Scores } from '../../..'
import { modalsAtom } from '../../../contexts/booleans'
import { bridgeAtom, studentAtom } from '../../../contexts/bridge'
import { schedulesAtom } from '../../../contexts/bridge/schedules'
import { scoresAtom } from '../../../contexts/bridge/scores'

export const CaptchaModal = () => {
  const student = useAtomValue(studentAtom)
  const bridge = useAtomValue(bridgeAtom)
  const [modals, setModals] = useAtom(modalsAtom)

  const setScores = useSetAtom(scoresAtom)
  const setSchedules = useSetAtom(schedulesAtom)

  const [captcha, setCaptcha] = useState('')
  const [token, setToken] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [status, setStatus] = useState('获取数据')

  const inputRef = useRef<HTMLInputElement>()
  const imageRef = useRef<HTMLImageElement>()

  useEffect(() => {
    const input = inputRef.current
    if (!input || !modals.captcha) return
    input.value = ''
    setToken('')
    input.focus()

    handleCaptcha()
  }, [modals.captcha])

  const handleCaptcha = async () => {
    const image = imageRef.current
    if (!image || !bridge) return
    try {
      const result = await bridge.captcha()
      image.src =
        'data:image/jpeg;charset=utf-8;base64,' + result.img.replace(/\\n/g, '')
      setToken(result.token)
    } catch (error) {
      console.error(error)
      enqueueSnackbar('验证码获取失败', { variant: 'error' })
    }
  }

  const handleFetch = async (e: FormEvent) => {
    e.preventDefault()
    if (!bridge || !student) return
    if (!token) {
      enqueueSnackbar('请先获取验证码')
      return
    }

    setLoading(true)
    setStatus('正在尝试登录')

    try {
      await bridge.login(
        { username: student.id, password: student.password },
        { captcha, token }
      )
    } catch (error) {
      console.error(error)
      setLoading(false)
      setStatus('重新获取')
      enqueueSnackbar('登录失败，请检查学号、密码以及验证码输入是否正确', {
        variant: 'error',
      })
    }

    try {
      setStatus('正在获取成绩')
      const scores = await bridge.score()
      setScores({
        id: student.id,
        date: new Date().toISOString(),
        scores: scores.reduce((pre, cur) => {
          const target = pre.find(s => s.id === cur.id)
          if (target) {
            target.score.push(cur.score)
            target.from.push(cur.from)
            target.mark?.push(cur.mark)
          } else
            pre.push({
              ...cur,
              score: [cur.score],
              from: [cur.from],
              mark: [cur.mark],
            } as Score)
          return pre
        }, [] as Scores),
      })

      setStatus('正在获取课表')
      const timetable = await bridge.timetable()
      setSchedules({
        id: student.id,
        date: new Date().toISOString(),
        timetable,
      })

      setLoading(false)
      setStatus('获取数据')
      setModals({ ...modals, captcha: false })
      enqueueSnackbar('成功获取成绩和课表数据', { variant: 'success' })
    } catch (error) {
      console.error(error)
      setLoading(false)
      setStatus('重新获取')
      enqueueSnackbar('获取数据失败，请稍后再试，或给我们提供反馈', {
        variant: 'error',
      })
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      keepMounted
      open={!!modals.captcha}
      onClose={() => setModals({ ...modals, captcha: false })}
      sx={{
        '& .MuiPaper-root': { maxWidth: '16rem' },
        '& .MuiDialogContent-root': { p: 0 },
      }}
    >
      <DialogTitle>
        <Typography
          component="p"
          variant="h6"
          sx={{ textAlign: 'center', pt: 3, pb: 0.5, fontWeight: 700 }}
        >
          获取数据
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', pb: 2.5 }}
        >
          需要输入验证码继续
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack
          component="form"
          onSubmit={handleFetch}
          spacing={1.5}
          sx={{ p: 2, alignItems: 'center' }}
        >
          <Stack direction="row" spacing={1.5}>
            <Box
              ref={imageRef}
              component="img"
              src=""
              onClick={handleCaptcha}
              title="点击更换验证码"
              alt="验证码"
              sx={{
                flex: 1,
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
                backgroundColor: 'action.hover',
                cursor: 'pointer',
              }}
            />
            <TextField
              inputRef={inputRef}
              required
              name="id"
              label="验证码"
              size="small"
              margin="dense"
              fullWidth
              autoFocus
              value={captcha}
              onChange={e => setCaptcha(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Stack>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
            loadingIndicator={status}
            sx={{ width: '100%', mt: 1 }}
          >
            获取数据
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
