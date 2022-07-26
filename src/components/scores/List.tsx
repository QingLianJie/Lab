import { FilterAltOutlined, InsertChartRounded } from '@mui/icons-material'
import {
  Card,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { modalsAtom } from '../../contexts/booleans'
import { scoresAtom } from '../../contexts/bridge/scores'
import { Tooltip } from '../base/Tooltip'
import { Fetch } from '../settings/Fetch'
import { NoScores } from './Placeholder'
import { Columns } from './toolbar/Columns'
import { Export } from './toolbar/Export'
import { Groups } from './toolbar/Groups'
import { Search } from './toolbar/Search'

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: '课程', width: 180 },
  { field: 'term', headerName: '学期', width: 120 },
  { field: 'type', headerName: '类型', width: 60 },
  { field: 'credit', headerName: '学分', width: 60 },
  { field: 'period', headerName: '学时', width: 60 },
  { field: 'nature', headerName: '性质', width: 200 },
  { field: 'score', headerName: '成绩' },
]

export const List = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const [scores, setScores] = useAtom(scoresAtom)

  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))

  const handleFilter = () =>
    setModals({
      ...modals,
      scores: { ...modals.scores, filter: true },
    })

  return (
    <Card variant="outlined">
      {scores ? (
        <Fragment>
          {scores.scores.length === 0 ? (
            <NoScores />
          ) : (
            <Fragment>
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
                        sx={{ color: 'text.secondary' }}
                        onClick={handleFilter}
                      >
                        <FilterAltOutlined />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Export />
                </Stack>
              </Stack>
              <Divider />
              <TableContainer>
                <Table aria-label="成绩列表">
                  <TableHead></TableHead>
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fetch name="成绩" icon={InsertChartRounded} />
      )}
    </Card>
  )
}
