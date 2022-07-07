import { Divider, Stack } from '@mui/material'
import { Fragment } from 'react'
import { faqs } from '../../../markdown/settings/帮助'
import { Details } from '../../base/Details'
import { Markdown } from '../../base/Markdown'
import { SettingsHeader } from '../Header'

export const Help = () => (
  <Fragment>
    <SettingsHeader
      title="帮助与常见问题"
      href="https://github.com/QingLianJie/Lab"
    />

    <Stack
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          orientation="vertical"
          sx={{ display: { xs: 'none', md: 'flex' }, height: '100%' }}
        />
      }
      sx={{ alignItems: 'flex-start', height: '100%' }}
    >
      <Stack sx={{ flex: 1, width: '100%' }}>
        {faqs.slice(0, Math.ceil(faqs.length / 2)).map(faq => (
          <Details summary={faq.question} key={faq.question}>
            <Markdown>{faq.answer}</Markdown>
          </Details>
        ))}
      </Stack>
      <Stack sx={{ flex: 1, width: '100%' }}>
        {faqs.slice(Math.ceil(faqs.length / 2)).map(faq => (
          <Details summary={faq.question} key={faq.question}>
            <Markdown>{faq.answer}</Markdown>
          </Details>
        ))}
      </Stack>
    </Stack>
  </Fragment>
)
