import { FilterAltOutlined, SearchOutlined } from '@mui/icons-material'
import {
  Card,
  IconButton,
  InputAdornment,
  InputBase,
  Stack,
} from '@mui/material'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useKey, useKeyPress } from 'react-use'
import { Tooltip } from '../base/styled/Tooltip'

export const HomeSearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  useKey(
    'Enter',
    e => {
      if (!search || !inputRef || inputRef?.current !== e.target) return
      navigate(`/courses?search=${search}`)
      setSearch('')
    },
    undefined,
    [search]
  )

  return (
    <Card variant="outlined">
      <Stack direction="row" sx={{ flex: 1, px: 1 }}>
        <InputBase
          inputRef={inputRef}
          placeholder="搜索课程数据"
          inputProps={{ 'aria-label': '搜索课程数据' }}
          autoComplete="off"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{
            ml: 0.75,
            mr: 0,
            flex: 1,
            py: 0.75,
            '&:hover svg': { color: 'text.secondary' },
          }}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: 1.5 }}>
              <SearchOutlined
                sx={{ color: 'text.disabled', transition: 'all 0.2s' }}
              />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end" sx={{ ml: 1.5 }}>
              <Tooltip title="筛选课程" arrow placement="top">
                <IconButton aria-label="筛选课程">
                  <FilterAltOutlined
                    sx={{ color: 'text.disabled', transition: 'all 0.2s' }}
                  />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
      </Stack>
    </Card>
  )
}
