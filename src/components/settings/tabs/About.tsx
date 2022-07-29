import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { Fragment, useState } from 'react'
import { info } from '../../../configs/site-info'
import { SettingsHeader } from '../Header'
import LogoOutlined from '../../../assets/logo-outlined.svg'
import { Tooltip } from '../../base/Tooltip'
import { ThumbDownAltOutlined } from '@mui/icons-material'

export const SettingsAbout = () => {
  const [eggs, setEggs] = useState('你瞅啥')
  const [count, setCount] = useState(1)

  const handleEggs = () => {
    setCount(count + 1)
    setEggs('?'.repeat(count))

    if (count === 7) {
      alert('🙃')
      const html = document.querySelector('html')
      if (!html) return
      html.style.overflow = 'hidden'
      html.style.transition = 'transform 0.35s ease'
      html.style.transform = 'rotate(180deg)'
    } else if (count > 7) {
      const html = document.querySelector('html')
      if (!html) return
      html.style.transform = ''
      html.style.overflow = ''
      setCount(1)
      setEggs('你瞅啥')
    }
  }

  return (
    <Fragment>
      <SettingsHeader title={`关于${info.name}`}>
        <Tooltip title={eggs} arrow placement="top">
          <IconButton
            aria-label="彩蛋"
            onClick={handleEggs}
            sx={{
              color: 'text.disabled',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s',
            }}
          >
            <ThumbDownAltOutlined />
          </IconButton>
        </Tooltip>
      </SettingsHeader>
      <Stack
        spacing={1}
        sx={{
          flex: 1,
          height: '100%',
          px: { xs: 2.5, md: 3 },
          pt: 4,
          pb: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar
          variant="square"
          alt="网站 Logo"
          src={LogoOutlined}
          sx={{ width: 96, height: 96, m: 2 }}
        />
        <Typography variant="h5" component="p" sx={{ fontWeight: 700 }}>
          {info.name}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {info.description.slice(0, -1)}
        </Typography>

        <Tooltip title="GitHub" arrow placement="top">
          <IconButton
            aria-label="GitHub"
            href={info.github}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.disabled',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s',
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Fragment>
  )
}

const GitHubIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
      transform="scale(64)"
      fill="currentColor"
    />
  </svg>
)
