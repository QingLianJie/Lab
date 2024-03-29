import { SearchOutlined } from '@mui/icons-material'
import { InputAdornment, InputBase, Stack } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import { scoresAtom, scoresFilterAtom } from '../../contexts/scores'

export const ScoresSearch = () => {
  const scores = useAtomValue(scoresAtom)
  const [scoresFilter, setScoresFilter] = useAtom(scoresFilterAtom)
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    if (!scores) return
    setScoresFilter(filter => ({ ...filter, search }))
  }

  useDebounce(handleSearch, 100, [search])

  return (
    <Stack direction="row" sx={{ flex: 1 }}>
      <InputBase
        placeholder="搜索成绩"
        inputProps={{ 'aria-label': '搜索成绩' }}
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
