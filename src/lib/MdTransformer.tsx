import remark from 'remark'
import slug from 'remark-slug'
import remark2reype from 'remark-rehype'
import rehype2react from 'rehype-react'
import rehypePrism from '@mapbox/rehype-prism'
import React from 'react'

export const MdTransformer = ({ mdText }) => {
  const processor = remark()
    .use(slug)
    .use(remark2reype)
    .use(rehypePrism)
    .use(rehype2react, { createElement: React.createElement })

  return <div>{processor.processSync(mdText).result}</div>
}
