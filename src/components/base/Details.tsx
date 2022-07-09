import { ExpandMoreOutlined } from '@mui/icons-material'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material'
import { ReactNode } from 'react'

interface FoldProps {
  summary: string
  children: ReactNode
}

export const Details = ({ summary, children }: FoldProps) => (
  <Accordion
    sx={{
      breakInside: 'avoid',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      px: { xs: 0.5, md: 1 },
      borderBottom: 1,
      borderColor: 'divider',
      '&.Mui-expanded': { my: 0 },
      '&::before': { display: 'none' },
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreOutlined sx={{ color: 'text.disabled' }} />}
      sx={{
        '&.Mui-expanded p': { fontWeight: 700 },
        '& .MuiAccordionSummary-content': { overflow: 'hidden' },
      }}
    >
      <Typography
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {summary}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ pt: 0, pb: 2.5 }}>{children}</AccordionDetails>
  </Accordion>
)
