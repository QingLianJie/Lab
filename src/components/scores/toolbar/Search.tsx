import { SearchOutlined } from '@mui/icons-material'
import { Stack, InputBase, InputAdornment } from '@mui/material'

export const Search = () => {
  return (
    <Stack direction="row" sx={{ flex: 1 }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="搜索成绩"
        inputProps={{ 'aria-label': '搜索成绩' }}
        startAdornment={
          <InputAdornment position="start" sx={{ mr: 1.5 }}>
            <SearchOutlined />
          </InputAdornment>
        }
      />
    </Stack>
  )
}
