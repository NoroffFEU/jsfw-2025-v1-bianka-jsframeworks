interface ProductTagsProps {
  tags: string[]
}

function ProductTags({ tags }: ProductTagsProps) {
  if (!tags.length) {
    return null
  }

  return (
    <section>
      <h2>Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </section>
  )
}

export default ProductTags
