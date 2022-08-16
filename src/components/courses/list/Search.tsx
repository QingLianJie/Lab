import { SearchOutlined } from '@mui/icons-material'
import { InputAdornment, InputBase, Stack } from '@mui/material'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useKey } from 'react-use'
import { coursesHistoryAtom } from '../../../contexts/courses'

export const CoursesListSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('search') || '')
  const [coursesHistory, setCoursesHistory] = useAtom(coursesHistoryAtom)

  useKey(
    'Enter',
    e => {
      if (!search || !inputRef || inputRef?.current !== e.target) return
      navigate(`/courses?search=${search}`)
      setCoursesHistory(coursesHistory => [
        { search, id: new Date().getTime() },
        ...coursesHistory,
      ])
    },
    undefined,
    [search]
  )

  useEffect(() => setSearch(params.get('search') || ''), [params])

  return (
    <Stack direction="row" sx={{ flex: 1 }}>
      <InputBase
        inputRef={inputRef}
        placeholder="搜索课程"
        inputProps={{ 'aria-label': '搜索课程' }}
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ ml: 0.75, flex: 1, '&:hover svg': { color: 'text.secondary' } }}
        startAdornment={
          <InputAdornment position="start" sx={{ mr: 1.5 }}>
            <SearchOutlined
              sx={{ color: 'text.disabled', transition: 'all 0.2s' }}
            />
          </InputAdornment>
        }
      />
    </Stack>
  )
}
