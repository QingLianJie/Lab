import { CopyAllOutlined, LanguageOutlined } from '@mui/icons-material'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Fragment } from 'react'
import { contacts } from '../../../configs/contact-us'
import { SettingsHeader } from '../Header'

export const Feedback = () => (
  <Fragment>
    <SettingsHeader title="联系我们" help="/settings?tab=help#feedback" />
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
        {contacts
          .filter((_, i) => !(i % 2))
          .map(contact => (
            <ContactCard contact={contact} key={contact.name} />
          ))}
      </Stack>
      <Stack divider={<Divider />} sx={{ flex: 1 }}>
        {contacts
          .filter((_, i) => i % 2)
          .map(contact => (
            <ContactCard contact={contact} key={contact.name} />
          ))}
      </Stack>
    </Stack>
  </Fragment>
)

interface ContactCardProps {
  contact: typeof contacts[number]
}

const ContactCard = ({ contact }: ContactCardProps) => (
  <Stack
    spacing={0.5}
    sx={{ flex: 1, px: { xs: 1.5, md: 2 }, py: 2.5, position: 'relative' }}
  >
    <Typography
      component="span"
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
          variant="text"
          disableElevation
          href={action.type === 'link' ? action.href : undefined}
          target={action.type === 'link' ? '_blank' : undefined}
          rel={action.type === 'link' ? 'noopener noreferrer' : undefined}
          color="secondary"
          startIcon={
            action.type === 'link' ? <LanguageOutlined /> : <CopyAllOutlined />
          }
          onClick={
            action.type === 'copy'
              ? () => navigator.clipboard.writeText(action.content || '')
              : undefined
          }
          key={action.name}
          sx={{ minWidth: 'unset', py: 0.5, px: 1.5, color: blue[500] }}
        >
          {action.name}
        </Button>
      ))}
    </Stack>
  </Stack>
)
