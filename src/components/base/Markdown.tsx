import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import '../../libs/github-markdown.css'

interface MarkdownProps extends ReactMarkdownOptions {
  children: string
}

export const Markdown = ({ children, ...props }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className="markdown-body"
      linkTarget="_blank"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      {...props}
    >
      {children}
    </ReactMarkdown>
  )
}
