import { SearchOutlined } from '@mui/icons-material'
import { Stack, InputBase, InputAdornment } from '@mui/material'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import { scoresFilterAtom } from '../../../contexts/bridge/scores'

export const Search = () => {
  const [scoresFilter, setScoresFilter] = useAtom(scoresFilterAtom)
  const [search, setSearch] = useState('')

  useDebounce(
    () =>
      setScoresFilter({
        ...scoresFilter,
        search: search.trim().toLocaleLowerCase(),
      }),
    100,
    [search]
  )

  return (
    <Stack direction="row" sx={{ flex: 1 }}>
      <InputBase
        placeholder="搜索成绩"
        inputProps={{ 'aria-label': '搜索成绩' }}
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ ml: 0.75, flex: 1, '&:hover svg': { color: 'text.primary' } }}
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
