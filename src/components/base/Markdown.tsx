import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import '../../libs/github-markdown.css'

interface MarkdownProps {
  children: string
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className="markdown-body"
      linkTarget="_blank"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </ReactMarkdown>
  )
}
