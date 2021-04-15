import styled from 'styled-components'

const StyledUl = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
`

export const TagItem = styled.li`
  display: inline-block;
  background-color: steelblue;
  color: white;
  margin-right: 4px;
  padding: 0 2px;
  border-radius: 2px;
  font-size: 14px;
`

export const TagList = ({ tags }) => (
  <StyledUl>
    {tags.map((tag) => (
      <TagItem key={tag}>#{tag}</TagItem>
    ))}
  </StyledUl>
)
