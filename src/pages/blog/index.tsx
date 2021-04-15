import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getAllContentFromMd } from 'src/lib/mdHelper'
import { TagList } from 'src/components/TagList'
import { FlexRow } from 'src/components/Flex'
const BlogList = ({ posts }) => {
  return (
    <>
      <h1>blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <FlexRow>
              <Link href={`/blog/${post.slug}`}>
                <a style={{ marginRight: '8px' }}>{post.data.title}</a>
              </Link>
              <TagList tags={post.data.tags} />
            </FlexRow>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const dirPath = 'contents/posts'
  const posts = getAllContentFromMd(dirPath, 'slug')
  return {
    props: {
      posts: posts,
    },
  }
}

export default BlogList
