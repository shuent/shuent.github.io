import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
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

export const MdContent = ({ mdText }) => {
  return <ReactMarkdown source={mdText} renderers={{ code: Highlighter }} />
}
