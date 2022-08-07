import { ArrowForwardOutlined } from '@mui/icons-material'
import { Alert, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import markdown from '../../markdown/notes.md?raw'
import { Markdown } from '../base/Markdown'

export const HomeNotes = () => {
  const navigate = useNavigate()

  return (
    <Alert
      variant="outlined"
      severity="info"
      action={
        <IconButton
          aria-label="反馈"
          size="small"
          color="inherit"
          onClick={() => navigate('/settings?tab=contact')}
          sx={{ my: -0.25 }}
        >
          <ArrowForwardOutlined sx={{ width: 22, height: 22 }} />
        </IconButton>
      }
      sx={{ backgroundColor: 'background.paper' }}
    >
      <Markdown>{markdown}</Markdown>
    </Alert>
  )
}
