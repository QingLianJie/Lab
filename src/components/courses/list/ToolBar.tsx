import { FilterAltOutlined } from '@mui/icons-material'
import { Stack, IconButton, useMediaQuery, useTheme, Card } from '@mui/material'
import { useAtom } from 'jotai'
import { modalsAtom } from '../../../contexts/modals'
import { Tooltip } from '../../base/styled/Tooltip'
import { CoursesListColumnsAction } from './actions/Columns'
import { CoursesHistoryAction } from './actions/History'
import { CoursesListSearch } from './Search'

export const CoursesListToolBar = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const handleFilter = () =>
    setModals(modals => ({
      ...modals,
      courses: { ...modals.courses, filter: true },
    }))

  return (
    <Card variant="outlined">
      <Stack
        direction="row"
        spacing={2}
        sx={{
          px: { xs: 1, md: 1.5 },
          py: 0.5,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CoursesListSearch />
        <Stack spacing={0.5} direction="row">
          <CoursesListColumnsAction />
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
          <CoursesHistoryAction />
        </Stack>
      </Stack>
    </Card>
  )
}
