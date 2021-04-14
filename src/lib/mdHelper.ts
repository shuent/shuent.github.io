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
    data: matterResult.data,
  }
}

export const getAllContentFromMd = (
  dirPath: string,
  fileNameAs = 'fileName'
) => {
  const directory = path.join(process.cwd(), dirPath)

  const fileNames = fs
    .readdirSync(directory)
    .map((fileName) => fileName.replace(/\.md$/, ''))

  return fileNames.map((fileName) => ({
    [fileNameAs]: fileName,
    ...getMatterParsedContentFromMd(dirPath, fileName),
  }))
}
