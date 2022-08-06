import { FilterAltOutlined } from '@mui/icons-material'
import { Stack, IconButton, useMediaQuery, useTheme, Card } from '@mui/material'
import { useAtom } from 'jotai'
import { modalsAtom } from '../../contexts/modals'
import { Tooltip } from '../base/styled/Tooltip'
import { ScoresColumnsAction } from './actions/Columns'
import { ScoresExportAction } from './actions/Export'
import { ScoresGroupsAction } from './actions/Groups'
import { ScoresSearch } from './Search'

export const ScoresToolBar = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const handleFilter = () =>
    setModals({
      ...modals,
      scores: { ...modals.scores, filter: true },
    })

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
        <ScoresSearch />
        <Stack spacing={0.5} direction="row">
          <ScoresGroupsAction />
          <ScoresColumnsAction />

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

          <ScoresExportAction />
        </Stack>
      </Stack>
    </Card>
  )
}
