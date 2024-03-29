import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import breakLine from 'remark-breaks'
const Highlighter = ({ language, value }) => (
  <SyntaxHighlighter
    language={language}
    style={atomDark}
    wrapLines={true}
    showLineNumbers={true}
  >
    {value}
  </SyntaxHighlighter>
)

export const MdContent = ({ children }) => {
  return (
    <ReactMarkdown plugins={[gfm, breakLine]} renderers={{ code: Highlighter }}>
      {children}
    </ReactMarkdown>
  )
}
