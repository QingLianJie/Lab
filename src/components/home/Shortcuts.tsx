import { BookOnlineOutlined, SvgIconComponent } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  Divider,
  Icon,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { routers, shortcuts } from '../../configs/routers'

export const HomeShortcuts = () => {
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  return (
    <Card variant="outlined">
      <Stack
        divider={<Divider orientation="horizontal" sx={{ height: 'auto' }} />}
        sx={{ overflowX: 'auto' }}
      >
        {shortcuts.map((row, index) => (
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" sx={{ height: 'auto' }} />}
            sx={{ width: '100%', flex: 1 }}
            key={index}
          >
            {row.map(item => (
              <CardActionArea key={item.name} component={Link} to={item.href}>
                <Stack
                  spacing={1.5}
                  direction="row"
                  sx={{
                    position: 'relative',
                    px: 2,
                    py: 1.75,
                    flex: 1,
                    width: '100%',
                  }}
                >
                  <Stack>
                    <Typography
                      variant="body1"
                      sx={{ whiteSpace: 'nowrap', fontWeight: 700 }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.disabled',
                        fontFamily: 'code.fontFamily',
                      }}
                    >
                      {item.href.replace(/^\//, '')}
                    </Typography>
                  </Stack>
                  <Icon
                    component={item.icon[0]}
                    sx={{
                      position: 'absolute',
                      right: 14,
                      top: 14,
                      color: item.color[isDark ? 1 : 0],
                      width: 24,
                      height: 24,
                    }}
                  />
                </Stack>
              </CardActionArea>
            ))}
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}
