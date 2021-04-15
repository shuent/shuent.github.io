import { GetStaticProps } from 'next'
import { getAllContentFromMd } from 'src/lib/mdHelper'
import { MdContent } from 'src/lib/MdContent'

const MiscList = ({ posts }) => {
  return (
    <>
      <p>些細なチラ裏</p>
      <h1>Misc</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <h2>{post.data.title}</h2>
            <p>{post.data.date}</p>
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
