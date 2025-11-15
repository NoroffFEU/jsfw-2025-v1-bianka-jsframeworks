import type { ProductImage } from '../../types/product'

interface ProductMediaProps {
  image: ProductImage
  title: string
}

function ProductMedia({ image, title }: ProductMediaProps) {
  return (
    <section>
      <img src={image.url} alt={image.alt || title} />
    </section>
  )
}

export default ProductMedia
