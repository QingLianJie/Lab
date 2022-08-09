import { AlternateEmailOutlined, CopyAllOutlined, LanguageOutlined } from '@mui/icons-material'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { Fragment } from 'react'
import { links } from '../../../configs/settings/links'
import { SettingsHeader } from '../Header'

export const SettingsContact = () => (
  <Fragment>
    <SettingsHeader
      title="联系我们"
      help="/settings?tab=help#feedback"
      icon={AlternateEmailOutlined}
    />
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      divider={
        <Divider
          orientation="vertical"
          sx={{
            height: { xs: 'auto', sm: '100%' },
            width: { xs: '100%', sm: 'auto' },
            borderBottomWidth: { xs: 1, sm: 0 },
            borderBottomColor: 'divider',
          }}
        />
      }
      sx={{ height: '100%' }}
    >
      <Stack divider={<Divider />} sx={{ flex: 1 }}>
        {links
          .filter((_, i) => !(i % 2))
          .map(contact => (
            <ContactCard contact={contact} key={contact.name} />
          ))}
      </Stack>
      <Stack divider={<Divider />} sx={{ flex: 1 }}>
        {links
          .filter((_, i) => i % 2)
          .map(contact => (
            <ContactCard contact={contact} key={contact.name} />
          ))}
      </Stack>
    </Stack>
  </Fragment>
)

interface ContactCardProps {
  contact: typeof links[number]
}

const ContactCard = ({ contact }: ContactCardProps) => (
  <Stack
    spacing={0.5}
    sx={{
      flex: 1,
      p: { xs: 1.5, md: 2 },
      position: 'relative',
    }}
  >
    <Typography
      component="span"
      aria-hidden
      sx={{
        fontWeight: 700,
        color: 'action.selected',
        position: 'absolute',
        right: 24,
        bottom: 16,
        userSelect: 'none',
        display: { xs: 'none', lg: 'flex' },
        fontSize: 'h4.fontSize',
      }}
    >
      {contact.name}
    </Typography>

    <Typography variant="h6" component="h2" sx={{ fontWeight: 700, px: 1 }}>
      {contact.name}
    </Typography>

    {contact.description.map(desc => (
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', px: 1 }}
        key={desc}
      >
        {desc}
      </Typography>
    ))}

    <Stack direction="row" sx={{ pt: 2, flex: 1, alignItems: 'flex-end' }}>
      {contact.actions.map(action => (
        <Button
          component={action.type === 'link' ? 'a' : 'button'}
          href={action.type === 'link' ? action.href : undefined}
          target={action.type === 'link' ? '_blank' : undefined}
          rel={action.type === 'link' ? 'noopener noreferrer' : undefined}
          startIcon={
            action.type === 'link' ? <LanguageOutlined /> : <CopyAllOutlined />
          }
          onClick={
            action.type === 'copy'
              ? () => {
                  if (!('clipboard' in navigator))
                    enqueueSnackbar(`浏览器不支持复制`)
                  else
                    navigator.clipboard
                      .writeText(action.content || '')
                      .then(() => enqueueSnackbar(`已复制 ${action.content}`))
                }
              : undefined
          }
          key={action.name}
        >
          {action.name}
        </Button>
      ))}
    </Stack>
  </Stack>
)
