import { FilterAltOutlined } from '@mui/icons-material'
import { Stack, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { useAtom } from 'jotai'
import { modalsAtom } from '../../contexts/booleans'
import { Tooltip } from '../base/Tooltip'
import { Columns } from './actions/Columns'
import { Export } from './actions/Export'
import { Groups } from './actions/Groups'
import { Search } from './Search'

export const ToolBar = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const handleFilter = () =>
    setModals({
      ...modals,
      scores: { ...modals.scores, filter: true },
    })

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        px: { xs: 1, md: 1.5 },
        py: 0.75,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Search />
      <Stack spacing={0.5} direction="row">
        <Groups />
        <Columns />

        {!isMobile && (
          <Tooltip title="筛选" arrow placement="top">
            <IconButton
              aria-label="筛选"
              sx={{
                color: 'text.disabled',
                '&:hover': { color: 'text.primary' },
                transition: 'all 0.2s',
              }}
              onClick={handleFilter}
            >
              <FilterAltOutlined />
            </IconButton>
          </Tooltip>
        )}

        <Export />
      </Stack>
    </Stack>
  )
}
