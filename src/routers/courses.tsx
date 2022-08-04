import { ClassRounded } from '@mui/icons-material'
import { createTheme, Stack, ThemeProvider, useTheme } from '@mui/material'
import { red } from '@mui/material/colors'
import { Layout, Working } from '../components/Layout'

export const CoursesPage = () => {
  const theme = useTheme()
  const { palette } = theme

  const coursesTheme = createTheme({
    ...theme,
    palette: { ...palette, primary: red },
  })

  return (
    <ThemeProvider theme={coursesTheme}>
      <Layout
        title="课程"
        subtitle="筛选和查看课程数据"
        icon={ClassRounded}
        color={red[400]}
      >
        <Stack spacing={2} sx={{ flex: 1 }}>
          <Working />
        </Stack>
      </Layout>
    </ThemeProvider>
  )
}
