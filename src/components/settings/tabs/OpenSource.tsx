import { Stack } from '@mui/material'
import { Fragment } from 'react'
import { Markdown } from '../../base/Markdown'
import { SettingsHeader } from '../Header'

const markdown = `
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) &nbsp;
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

清廉街的前端部分的代码按照 MIT License 开源，
网站 Logo 及文档按照 CC BY-SA 4.0 开源。

同时，清廉街项目的诞生也离不开众多开源软件的帮助。 

#### 前端项目使用到的主要开源项目

| 名称                | 开源协议   | 链接                                                |
| :------------------- | :---------- | :--------------------------------------------------- |
| React               | MIT        | https://github.com/facebook/react                   |
| Material UI         | MIT        | https://github.com/mui/material-ui                  |
| Emotion             | MIT        | https://github.com/emotion-js/emotion               |
| Lodash              | MIT        | https://github.com/lodash/lodash                    |
| React Router        | MIT        | https://github.com/remix-run/react-router           |
| React Markdown      | MIT        | https://github.com/remarkjs/react-markdown          |
| React Helmet Async  | Apache-2.0 | https://github.com/staylor/react-helmet-async       |
| GitHub Markdown CSS | MIT        | https://github.com/sindresorhus/github-markdown-css |
| Prettier            | MIT        | https://github.com/prettier/prettier                |
| Vite                | MIT        | https://github.com/vitejs/vite                      |
| Vite Plugin PWA     | MIT        | https://github.com/antfu/vite-plugin-pwa            |
| TypeScript          | Apache-2.0 | https://github.com/microsoft/TypeScript             |
`

export const OpenSource = () => (
  <Fragment>
    <SettingsHeader title="开源软件与协议" />
    <Stack sx={{ px: { xs: 2.5, md: 3 }, py: 2.5 }}>
      <Markdown>{markdown}</Markdown>
    </Stack>
  </Fragment>
)
