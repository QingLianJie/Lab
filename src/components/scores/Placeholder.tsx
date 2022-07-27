import {
  CalculateRounded,
  FilterAltRounded,
  type SvgIconComponent,
} from '@mui/icons-material'
import { Card, Icon, Stack, Typography } from '@mui/material'
import { Fragment } from 'react'

export const Disabled = () => (
  <Fragment>
    <DisabledCard
      icon={FilterAltRounded}
      title="成绩筛选"
      description="获取数据后进行筛选"
    />
    <DisabledCard
      icon={CalculateRounded}
      title="学分统计"
      description="获取数据后查看统计"
    />
  </Fragment>
)

interface DisabledCardProps {
  title: string
  description: string
  icon: SvgIconComponent
}

export const DisabledCard = ({
  title,
  description,
  icon,
}: DisabledCardProps) => (
  <Card variant="outlined" sx={{ p: 2 }}>
    <Stack
      spacing={2}
      direction="row"
      sx={{ flex: 1, height: '100%', alignItems: 'center' }}
    >
      <Icon
        component={icon}
        sx={{ width: 48, height: 48, color: 'action.selected' }}
      />
      <Stack spacing={0.25} sx={{ alignItems: 'flex-start' }}>
        <Typography
          variant="body1"
          component="span"
          sx={{
            color: 'text.primary',
            textAlign: 'center',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          component="span"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  </Card>
)

interface PlaceholderProps {
  title: string
  description: string
}

export const Placeholder = ({ title, description }: PlaceholderProps) => (
  <Stack
    spacing={0.5}
    sx={{
      flex: 1,
      width: '100%',
      height: '100%',
      px: 4,
      py: { xs: 4, sm: 12 },
      alignItems: 'center',
    }}
  >
    <Typography
      variant="h6"
      component="span"
      sx={{
        color: 'text.disabled',
        textAlign: 'center',
        fontWeight: 700,
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      component="span"
      sx={{ color: 'text.disabled', textAlign: 'center' }}
    >
      {description}
    </Typography>
  </Stack>
)
