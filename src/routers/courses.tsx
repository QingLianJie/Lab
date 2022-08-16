import { ClassRounded, FilterAltOutlined } from '@mui/icons-material'
import { createTheme, Fab, Stack, ThemeProvider, useTheme } from '@mui/material'
import { pink, red } from '@mui/material/colors'
import { useAtom } from 'jotai'
import { modalsAtom } from '../contexts/modals'
import { CoursesListTable } from '../components/courses/list/Table'
import { CoursesListToolBar } from '../components/courses/list/ToolBar'
import { Layout } from '../components/Layout'

export const CoursesPage = () => {
  const theme = useTheme()
  const { palette } = theme
  const isDark = palette.mode === 'dark'

  const coursesTheme = createTheme({
    ...theme,
    palette: {
      ...palette,
      primary: red,
      secondary: isDark ? { main: '#ec407a' } : pink,
    },
  })

  return (
    <ThemeProvider theme={coursesTheme}>
      <Layout
        title="课程"
        subtitle="筛选和查看课程数据"
        icon={ClassRounded}
        color={red[400]}
      >
        <FilterFab />
        <Stack spacing={2} sx={{ flex: 1 }}>
          <CoursesListToolBar />
          <CoursesListTable />
        </Stack>
      </Layout>
    </ThemeProvider>
  )
}

const FilterFab = () => {
  const [modals, setModals] = useAtom(modalsAtom)

  return (
    <Fab
      color="primary"
      aria-label="筛选"
      sx={{
        color: 'white',
        position: 'fixed',
        right: { xs: 24, md: 48 },
        bottom: { xs: 92, md: 48 },
      }}
      onClick={() =>
        setModals(modals => ({
          ...modals,
          courses: { ...modals.courses, filter: true },
        }))
      }
    >
      <FilterAltOutlined />
    </Fab>
  )
}
