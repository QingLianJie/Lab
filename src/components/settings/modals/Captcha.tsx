import { LoadingButton } from '@mui/lab'
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
} from '@mui/material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { range } from 'lodash'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Score, Scores } from '../../..'
import { colors } from '../../../configs/schedules/colors'
import { bridgeAtom, studentAtom } from '../../../contexts/bridge'
import { modalsAtom } from '../../../contexts/modals'
import { schedulesAtom } from '../../../contexts/schedules'
import { scoresAtom } from '../../../contexts/scores'
import { Modal } from '../../base/Modal'

const terms = range(2001, new Date().getFullYear() + 1)
  .map(year => [`${year}-${year + 1}-1`, `${year}-${year + 1}-2`])
  .flat()
  .reverse()

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
  const [term, setTerm] = useState('')
  const [upload, setUpload] = useState(false)

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
      enqueueSnackbar('验证码获取失败')
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
      enqueueSnackbar('登录失败，请检查学号、密码以及验证码输入是否正确')
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
      const timetable = await bridge.timetable(term ? term : undefined)
      const colorize = timetable.courses
        ? [
            ...new Set([
              ...timetable.courses?.main.map(course => course.name),
              ...timetable.courses?.remark.map(course => course.name),
            ]),
          ].map((name, index) => ({
            name,
            color: colors[index % colors.length].name,
          }))
        : []

      setSchedules({
        id: student.id,
        date: new Date().toISOString(),
        timetable,
        colors: colorize,
      })

      setLoading(false)
      setStatus('获取数据')
      setTerm('')
      setCaptcha('')
      setToken('')
      setModals(modals => ({ ...modals, captcha: false }))
      enqueueSnackbar('成功获取成绩和课表数据')

      if (upload) {
        setUpload(false)
        enqueueSnackbar('上传成绩还没做')
        setModals(modals => ({ ...modals, thanks: true }))
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      setStatus('重新获取')
      enqueueSnackbar('获取数据失败，请稍后再试，或给我们提供反馈')
    }
  }

  return (
    <Modal
      title="获取数据"
      subtitle="需要输入验证码继续"
      fullWidth
      maxWidth={false}
      keepMounted
      open={!!modals.captcha}
      onClose={() => setModals({ ...modals, captcha: false })}
      sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
    >
      <Stack
        component="form"
        onSubmit={handleFetch}
        spacing={1.5}
        sx={{ px: 2.5, pb: 2.5, alignItems: 'center' }}
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
            fullWidth
            autoFocus
            value={captcha}
            onChange={e => setCaptcha(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Stack>
        <Autocomplete
          options={terms}
          size="small"
          sx={{ width: '100%' }}
          inputValue={term}
          onInputChange={(_e, v) => setTerm(v)}
          renderInput={params => (
            <TextField {...params} fullWidth label="课表学期，默认为最新" />
          )}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={isLoading}
          loadingIndicator={status}
          sx={{ width: '100%', mt: 1, py: 0.75 }}
        >
          获取数据
        </LoadingButton>
      </Stack>
      <Divider sx={{ width: '100%' }} />

      <Stack spacing={1.5} sx={{ px: 2.75, py: 1.75 }}>
        <FormControl
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                sx={{ my: -1 }}
                size="small"
                checked={upload}
                onChange={e => setUpload(e.target.checked)}
              />
            }
            label="同时将数据匿名上传，帮助清廉街完善课程数据库"
            sx={{
              width: '100%',
              ml: -1,
              mr: 0,
              alignItems: 'flex-start',
              '& span': { fontSize: 'body2.fontSize' },
            }}
          />
        </FormControl>
      </Stack>
    </Modal>
  )
}
