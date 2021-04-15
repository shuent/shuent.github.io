import { GetStaticProps } from 'next'
import { getAllContentFromMd } from 'src/lib/mdHelper'
import { MdContent } from 'src/lib/MdContent'
import { TagList } from 'src/components/TagList'
import { FlexRow } from 'src/components/Flex'

const MiscList = ({ posts }) => {
  return (
    <>
      <p>些細なチラ裏</p>
      <h1>Misc</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <h2>{post.data.title}</h2>
            <FlexRow>
              <p style={{ marginRight: '8px' }}>{post.data.date}</p>
              <TagList tags={post.data.tags} />
            </FlexRow>
            <MdContent mdText={post.content} />
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const dirPath = 'contents/miscs'
  const posts = getAllContentFromMd(dirPath, 'slug')
  return {
    props: {
      posts: posts,
    },
  }
}

export default MiscList
