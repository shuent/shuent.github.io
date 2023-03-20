import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getAllContentFromMd } from 'src/lib/mdHelper'
import { TagList } from 'src/components/TagList'
import { getAllPosts } from 'src/lib/qiita'
const BlogList = ({ posts, qiitaPosts }) => {
  return (
    <>
      <h2 className="text-lg">blog</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              style={{ marginRight: '8px', marginBottom: '4px' }}
            >
              {post.data.title}
            </Link>
            <TagList tags={post.data.tags} />
          </li>
        ))}
      </ul>
      <h2 className="text-lg">Qiita</h2>
      <ul>
        {qiitaPosts.map((post) => (
          <li key={post.title}>
            <Link
              href={post.url}
              style={{ marginRight: '8px', marginBottom: '4px' }}
            >
              {post.title}
            </Link>
            <TagList tags={post.tags} />
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const dirPath = 'contents/posts'
  const posts = getAllContentFromMd(dirPath, 'slug')
  const qiitaPosts = await getAllPosts()
  return {
    props: {
      posts,
      qiitaPosts,
    },
  }
}

export default BlogList
