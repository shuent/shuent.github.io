import { GetStaticPaths, GetStaticProps } from 'next'
import { generatePaths, getMatterParsedContentFromMd } from 'src/lib/mdHelper'
import { ParsedUrlQuery } from 'node:querystring'
import { MdContent } from 'src/lib/MdContent'
import { TagList } from 'src/components/TagList'
import { FlexRow } from 'src/components/Flex'
const Post = ({ mdContent, ...data }) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <FlexRow>
        <p style={{ marginRight: '8px' }}>{data.date}</p>
        <TagList tags={data.tags} />
      </FlexRow>
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
