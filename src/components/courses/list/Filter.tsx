import {
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { useAtom } from 'jotai'
import { Fragment, useEffect, useState, type FormEvent } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  courseNature,
  courseTest,
  courseType,
} from '../../../configs/courses/filters'
import { coursesHistoryAtom } from '../../../contexts/courses'
import { modalsAtom } from '../../../contexts/modals'
import { removeEmpty } from '../../../utils/format'
import { Modal } from '../../base/Modal'

const defaultForm = { type: '', nature: '', test: '', credit: '', period: '' }

export const CoursesListFilterModal = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const [modals, setModals] = useAtom(modalsAtom)
  const [coursesHistory, setCoursesHistory] = useAtom(coursesHistoryAtom)

  const [form, setForm] = useState(
    pathname === '/courses'
      ? {
          type: params.get('type') || '',
          nature: params.get('nature') || '',
          test: params.get('test') || '',
          credit: params.get('credit') || '',
          period: params.get('period') || '',
        }
      : defaultForm
  )

  useEffect(() => {
    if (pathname !== '/courses') return
    setForm({
      type: params.get('type') || '',
      nature: params.get('nature') || '',
      test: params.get('test') || '',
      credit: params.get('credit') || '',
      period: params.get('period') || '',
    })
  }, [params])

  const handleClose = () =>
    setModals(modals => ({
      ...modals,
      courses: { ...modals.courses, filter: false },
    }))

  const handleFilter = (e: FormEvent) => {
    e.preventDefault()
    if (Object.values(form).every(item => !item)) {
      handleClose()
      navigate('/courses')
      return
    }

    const data = removeEmpty(form)
    const params = new URLSearchParams(data).toString()
    if (pathname !== '/courses') navigate(`/courses?${params}`)
    else setParams(params)

    setCoursesHistory(coursesHistory => [
      { ...data, id: new Date().getTime() },
      ...coursesHistory,
    ])
    handleClose()
  }

  const handleResetFilter = () => {
    setForm(defaultForm)
    setParams('')
    handleClose()
  }

  return (
    <Fragment>
      <Modal
        title="筛选课程"
        fullWidth
        maxWidth={false}
        open={modals.courses.filter}
        keepMounted
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
      >
        <Stack
          component="form"
          spacing={1.5}
          sx={{ px: 2.5, pb: 2.5, overflowY: 'unset' }}
          onSubmit={handleFilter}
          onReset={handleResetFilter}
        >
          <FormControl size="small">
            <InputLabel id="course-type-label" size="small">
              课程类型
            </InputLabel>
            <Select
              labelId="course-type-label"
              id="course-type"
              label="课程类型"
              value={form.type}
              onChange={e =>
                setForm(form => ({ ...form, type: e.target.value }))
              }
              MenuProps={{ TransitionComponent: Fade }}
            >
              <MenuItem value="">不限</MenuItem>
              {courseType.map(item => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel id="course-nature-label" size="small">
              课程性质
            </InputLabel>
            <Select
              labelId="course-nature-label"
              id="course-nature"
              label="课程性质"
              value={form.nature}
              onChange={e =>
                setForm(form => ({ ...form, nature: e.target.value }))
              }
              MenuProps={{ TransitionComponent: Fade }}
            >
              <MenuItem value="">不限</MenuItem>
              {courseNature.map(item => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel id="course-category-label" size="small">
              考核方式
            </InputLabel>
            <Select
              labelId="course-test-label"
              id="course-test"
              label="考核方式"
              value={form.test}
              onChange={e =>
                setForm(form => ({ ...form, test: e.target.value }))
              }
              MenuProps={{ TransitionComponent: Fade }}
            >
              <MenuItem value="">不限</MenuItem>
              {courseTest.map(item => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row">
            <TextField
              id="score-credit"
              label="学分"
              size="small"
              sx={{ mr: 1.5 }}
              value={form.credit}
              onChange={e =>
                setForm(form => ({ ...form, credit: e.target.value }))
              }
            />
            <TextField
              id="score-period"
              label="学时"
              size="small"
              value={form.period}
              onChange={e =>
                setForm(form => ({ ...form, period: e.target.value }))
              }
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '100%', mt: 1.5, py: 0.75 }}
          >
            筛选课程
          </Button>

          {pathname === '/courses' && (
            <Button
              type="reset"
              variant="outlined"
              color="warning"
              sx={{ width: '100%', mt: 1.5, py: 0.625 }}
            >
              重置筛选及搜索
            </Button>
          )}
        </Stack>
      </Modal>
    </Fragment>
  )
}
