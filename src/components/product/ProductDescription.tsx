interface ProductDescriptionProps {
  title: string
  description: string
}

function ProductDescription({ title, description }: ProductDescriptionProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export default ProductDescription
