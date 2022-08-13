import { Stack, Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { green, red, pink } from '@mui/material/colors'
import { useState } from 'react'
import { type CommentCourse } from '../../..'

interface HomeTrendsCommentStatisticsProps {
  course: CommentCourse
}

export const HomeTrendsCommentStatistics = ({
  course,
}: HomeTrendsCommentStatisticsProps) => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))

  const [excellent, setExcellent] = useState(9.5)
  const [failed, setFailed] = useState(5.12)
  const [average, setAverage] = useState(75.33)
  const [distribution, setDistribution] = useState([
    0, 0, 1, 5, 10, 12, 75, 67, 36, 25,
  ])

  return (
    <Stack
      direction={{ xs: 'row', md: 'column' }}
      sx={{
        pt: { xs: 1.5, md: 2 },
        pb: { xs: 2.5, md: 1.25 },
        px: { xs: 0.25, md: 0 },
      }}
      spacing={1.25}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          width: '100%',
          px: 2.25,
          alignItems: { xs: 'flex-start', md: 'center' },
          flex: { xs: 1, md: 'unset' },
        }}
      >
        <Stack
          sx={{
            width: 4,
            height: { xs: 60, md: 40 },
            borderRadius: 2,
            position: 'relative',
            justifyContent: 'space-between',
            backgroundColor: 'action.selected',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              backgroundColor: green[400],
              height: `${(excellent / (excellent + failed)) * 100}%`,
              width: '100%',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              backgroundColor: red[400],
              height: `${(failed / (excellent + failed)) * 100}%`,
              width: '100%',
            }}
          />
        </Stack>

        <Stack>
          <Typography
            variant="caption"
            sx={{ color: green[400], fontWeight: 700 }}
          >
            优秀率 {excellent.toFixed(2)}%
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: red[400], fontWeight: 700 }}
          >
            挂科率 {failed.toFixed(2)}%
          </Typography>
          {isMobile && (
            <Typography
              variant="caption"
              sx={{ color: pink[400], fontWeight: 700 }}
            >
              平均分 {average.toFixed(2)} 分
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack
        sx={{ width: '100%', px: 2.25, flex: { xs: 1, md: 'unset' } }}
        spacing={1.25}
      >
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          {distribution.map((item, index) => (
            <Box
              key={index}
              sx={{
                height: { xs: 60, md: 42 },
                width: 4,
                backgroundColor: 'action.selected',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: `${item}%`,
                  backgroundColor: index < 6 ? red[400] : green[400],
                }}
              />
            </Box>
          ))}
        </Stack>
        {!isMobile && (
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Stack
              sx={{
                width: 4,
                height: 16,
                borderRadius: 2,
                position: 'relative',
                justifyContent: 'flex-end',
                backgroundColor: 'action.selected',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: `${average}%`,
                  backgroundColor: pink[400],
                }}
              />
            </Stack>
            <Typography
              variant="caption"
              sx={{ color: pink[400], fontWeight: 700 }}
            >
              平均分 {average.toFixed(2)} 分
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
