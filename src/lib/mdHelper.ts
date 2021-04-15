import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const generatePaths = (dirPath: string, property: string) => {
  const directory = path.join(process.cwd(), dirPath)
  const fileNames = fs
    .readdirSync(directory)
    .map((fileName) => fileName.replace(/\.md$/, ''))
  const paths = fileNames.map((fileName) => ({
    params: { [property]: fileName },
  }))
  return paths
}

export const getMatterParsedContentFromMd = (
  dirPath: string,
  fileName: string
) => {
  const directory = path.join(process.cwd(), dirPath)
  const fullPath = path.join(directory, `${fileName}.md`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContent)

  return {
    content: matterResult.content,
    data: {
      title: matterResult.data.title,
      date: new Date(matterResult.data.date).toDateString(),
      tags: matterResult.data.tags || [],
    },
  }
}

export const getAllContentFromMd = (
  dirPath: string,
  fileNameAs = 'fileName'
) => {
  const directory = path.join(process.cwd(), dirPath)

  const contents = fs.readdirSync(directory).map((fileName) => {
    const chopped = fileName.replace(/\.md$/, '')
    return {
      [fileNameAs]: chopped,
      ...getMatterParsedContentFromMd(dirPath, chopped),
    }
  })

  contents.sort((a, b) =>
    new Date(a.data.date) <= new Date(b.data.date) ? 1 : -1
  )

  return contents
}
