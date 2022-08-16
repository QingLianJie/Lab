import { FilterAltOutlined } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { useAtom } from 'jotai'
import { modalsAtom } from '../../../../contexts/modals'

export const CoursesListFilterFab = () => {
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
