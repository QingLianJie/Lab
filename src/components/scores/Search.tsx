import { SearchOutlined } from '@mui/icons-material'
import { Stack, InputBase, InputAdornment } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import { scoresAtom, scoresListAtom } from '../../contexts/bridge/scores'

export const Search = () => {
  const scores = useAtomValue(scoresAtom)
  const [scoresList, setScoreList] = useAtom(scoresListAtom)
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    if (!scores) return
    if (!search) {
      const result = scoresList.map(score => ({ ...score, hidden: false }))
      setScoreList(result)
      return
    }
    const result = scoresList.map(score => {
      const target = Object.values(score)
        .join(' ')
        .replace(/true|false|null/g, '')
        .trim()
        .toLocaleLowerCase()
      console.log(target)

      if (!target.includes(search)) return { ...score, hidden: true }
      return { ...score, hidden: false }
    })

    setScoreList(result)
  }

  useDebounce(handleSearch, 100, [search])

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
