import { GetStaticPaths, GetStaticProps } from 'next'
import { generatePaths, getMatterParsedContentFromMd } from 'src/lib/mdHelper'
import { ParsedUrlQuery } from 'node:querystring'
import { MdContent } from 'src/lib/MdContent'

const Post = ({ mdContent, ...data }) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <MdContent mdText={mdContent} />
    </div>
  )
}

const dirPath = 'contents/posts'

interface IParams extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams
  const matterResult = getMatterParsedContentFromMd(dirPath, slug)

  return {
    props: {
      mdContent: matterResult.content,
      ...matterResult.data,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = generatePaths(dirPath, 'slug')
  return {
    paths: paths,
    fallback: false,
  }
}

export default Post
