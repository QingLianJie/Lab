import { Card, Stack, Divider, Typography } from '@mui/material'
import { type CourseDetails } from '../../../index.d'

interface CourseDetailsInfoProps {
  details: CourseDetails
}

export const CourseDetailsInfo = ({ details }: CourseDetailsInfoProps) => (
  <Card variant="outlined">
    <Stack
      divider={<Divider orientation="horizontal" sx={{ height: 'auto' }} />}
      sx={{ overflowX: 'auto' }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
        sx={{ width: '100%', flex: 1 }}
      >
        <InfoCard title="课程类型" content={details.course.type} small />
        <InfoCard title="课程学分" content={details.course.credit} />
      </Stack>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
        sx={{ width: '100%', flex: 1 }}
      >
        <InfoCard title="考查方式" content={details.course.test} small />
        <InfoCard title="课程学时" content={details.course.period} />
      </Stack>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
        sx={{ width: '100%', flex: 1 }}
      >
        <InfoCard title="课程分类" content={details.course.nature} small />
      </Stack>

      {details.course.category && (
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
          sx={{ width: '100%', flex: 1 }}
        >
          <InfoCard title="课程分类" content={details.course.category} />
        </Stack>
      )}
    </Stack>
  </Card>
)

interface InfoCardProps {
  title: string
  content: string | number
  unit?: string
  small?: boolean
}

const InfoCard = ({ title, content, unit, small }: InfoCardProps) => (
  <Stack
    spacing={0.75}
    sx={{ px: 2.25, py: 2, flex: 1, width: '100%', overflow: 'hidden' }}
  >
    <Typography
      variant="body2"
      component="span"
      sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
    >
      {title}
    </Typography>
    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontWeight: 700,
          fontSize: small ? '1.125rem' : '1.25rem',
          lineHeight: '1.625rem',
        }}
      >
        {content}
      </Typography>
      <Typography
        variant="body2"
        component="span"
        sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
      >
        {unit}
      </Typography>
    </Stack>
  </Stack>
)
