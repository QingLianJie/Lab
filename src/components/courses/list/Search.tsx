import { SearchOutlined } from '@mui/icons-material'
import { InputAdornment, InputBase, Stack } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useKey } from 'react-use'

export const CoursesListSearch = () => {
  const [search, setSearch] = useState('')
  const [params, setParams] = useSearchParams()

  const handleSearch = () => {
    if (!search) return
    setParams({ search })
  }

  useKey('Enter', handleSearch)

  return (
    <Stack direction="row" sx={{ flex: 1 }}>
      <InputBase
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
