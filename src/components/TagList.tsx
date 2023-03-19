export const TagList = ({ tags }) => (
  <ul className="inline-block m-0 p-0">
    {tags.map((tag) => (
      <li
        className="inline-block bg-indigo-700 text-white mr-1 rounded-sm text-sm"
        key={tag}
      >
        #{tag}
      </li>
    ))}
  </ul>
)
