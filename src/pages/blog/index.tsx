import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getAllContentFromMd } from 'src/lib/mdHelper'
import { TagList } from 'src/components/TagList'
const BlogList = ({ posts }) => {
  return (
    <>
      <h1>blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a style={{ marginRight: '8px', marginBottom: '4px' }}>
                {post.data.title}
              </a>
            </Link>
            <TagList tags={post.data.tags} />
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
