import {
  Box,
  Card,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { columns } from '../../../configs/courses/columns'
import { prefix } from '../../../configs/site-info'
import { coursesViewAtom } from '../../../contexts/courses'
import { settingsAtom } from '../../../contexts/settings'
import { fetcher } from '../../../utils/addons'
import {
  coursesListQueryMap,
  coursesListResponseMap,
  type CoursesListResponse,
} from '../../../utils/maps'
import { BasePlaceholder } from '../../base/Placeholder'

export const CoursesListTable = () => {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const settings = useAtomValue(settingsAtom)

  const { data } = useSWR<CoursesListResponse>(
    `${settings.developer.api || prefix}/api/courses?${coursesListQueryMap(
      params.toString()
    )}`,
    fetcher,
    {
      refreshInterval: 60 * 60 * 1000,
      suspense: true,
      refreshWhenHidden: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  const coursesList = useMemo(() => {
    if (!data) return { count: 0, courses: [] }
    return coursesListResponseMap(data)
  }, [data])

  const coursesView = useAtomValue(coursesViewAtom)
  const filteredColumns = columns.filter(column =>
    coursesView.columns.includes(column.id)
  )

  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        <TableContainer>
          <Table
            aria-label="课程列表"
            sx={{
              border: 'none',
              width: 'auto',
              minWidth: '100%',
              tableLayout: 'fixed',
            }}
          >
            <TableHead>
              <TableRow sx={{ px: 4 }}>
                {filteredColumns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      width: column.width,
                      whiteSpace: 'nowrap',
                      fontSize: 'body2.fontSize',
                      fontWeight: 700,
                      color: 'text.secondary',
                      py: 1.25,
                      pl: {
                        xs: index === 0 ? 2 : 1,
                        sm: index === 0 ? 2.5 : 1.25,
                      },
                      pr: {
                        xs: index === filteredColumns.length - 1 ? 2 : 1,
                        sm: index === filteredColumns.length - 1 ? 2.5 : 1.25,
                      },
                      textAlign: column.number ? 'right' : 'left',
                      '&:last-of-type': { pr: 3 },
                    }}
                  >
                    {column.header || column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {coursesList.count === 0 ? (
              <Box component="caption">
                <BasePlaceholder
                  title="暂无课程数据"
                  description="当前筛选结果下并没有找到课程"
                />
              </Box>
            ) : (
              <TableBody>
                {coursesList.courses.map((course, listIndex) => (
                  <TableRow
                    key={course.id}
                    sx={{
                      '&:hover': { backgroundColor: 'action.hover' },
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={() =>
                      navigate(`/courses/${course.id}`, {
                        state: { title: course.name },
                      })
                    }
                  >
                    {filteredColumns.map((column, index) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          width: column.width,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          fontSize: 'body1.fontSize',
                          py: 1.25,
                          pl: {
                            xs: index === 0 ? 2 : 1,
                            sm: index === 0 ? 2.5 : 1.25,
                          },
                          pr: {
                            xs: index === filteredColumns.length - 1 ? 2 : 1,
                            sm:
                              index === filteredColumns.length - 1 ? 2.5 : 1.25,
                          },
                          textAlign: column.number ? 'right' : 'left',
                          color: 'text.primary',
                          borderBottomWidth:
                            coursesList.courses.length - 1 === listIndex
                              ? 0
                              : 1,
                        }}
                      >
                        <Typography
                          title={course[column.id]?.toString()}
                          sx={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            color:
                              column.id === 'id'
                                ? 'text.secondary'
                                : 'text.primary',
                            fontSize:
                              column.id === 'id'
                                ? 'body2.fontSize'
                                : 'body1.fontSize',
                            fontWeight: column.id === 'name' ? 700 : 500,
                          }}
                        >
                          {course[column.id]}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Card>
      {coursesList.count !== 0 && (
        <Card variant="outlined" sx={{ px: 1.5, py: 1 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <CoursesListPage count={coursesList.count} />
          </Stack>
        </Card>
      )}
    </Stack>
  )
}

interface CoursesListPageProps {
  count: number
}

const CoursesListPage = ({ count }: CoursesListPageProps) => {
  const [params, setParams] = useSearchParams()
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const isPad = useMediaQuery(breakpoints.down('md'))

  return (
    <Pagination
      color="primary"
      showFirstButton
      showLastButton
      siblingCount={isPad ? 0 : 2}
      boundaryCount={isMobile ? 0 : 2}
      count={Math.ceil(count / 10)}
      page={Number(params.get('page')) || 1}
      onChange={(_e, v) => {
        const result = new URLSearchParams(params)
        result.set('page', v.toString())
        setParams(result.toString())
      }}
      sx={{
        wdith: '100%',
        '& .MuiPaginationItem-root.Mui-selected': { fontWeight: 700 },
      }}
    />
  )
}
