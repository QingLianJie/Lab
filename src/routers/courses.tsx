import { ClassRounded } from '@mui/icons-material'
import { createTheme, Stack, ThemeProvider, useTheme } from '@mui/material'
import { red, pink } from '@mui/material/colors'
import { CoursesListFilterFab } from '../components/courses/list/filter/Fab'
import { CoursesListTable } from '../components/courses/list/Table'
import { CoursesListToolBar } from '../components/courses/list/ToolBar'
import { Layout, Working } from '../components/Layout'

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
        <CoursesListFilterFab />
        <Stack spacing={2} sx={{ flex: 1 }}>
          <CoursesListToolBar />
          <CoursesListTable />
        </Stack>
      </Layout>
    </ThemeProvider>
  )
}
