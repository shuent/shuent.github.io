import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getAllContentFromMd } from 'src/lib/mdHelper'

const BlogList = ({ posts }) => {
  return (
    <>
      <h1>blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.data.title}</Link>
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
