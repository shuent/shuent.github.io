export const getAllPosts = async () => {
  const userName = 'shuent'
  // TODO: 100件以上書いたらpagingする
  const url =
    'https://qiita.com/api/v2/items?page=1&per_page=100&query=user:' + userName
  const res = await fetch(url)
  const data = await res.json()

  return data.map((post) => ({
    title: post.title,
    body: post.body,
    url: post.url,
    tags: post.tags.map((tag) => tag.name),
    date: post.created_at,
  }))
}
