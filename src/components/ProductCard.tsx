import { Link } from 'react-router'
import type { Product } from '../types/product'
import useCart from '../hooks/useCart'
import useToast from '../hooks/useToast'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const hasDiscount = product.price > product.discountedPrice
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0

  return (
    <article>
      {hasDiscount && (
        <div>
          <span>-{discountPercentage}%</span>
        </div>
      )}
      <Link to={`/product/${product.id}`}>
        <img src={product.image.url} alt={product.image.alt} />
        <h3>{product.title}</h3>
        <div>
          {hasDiscount && (
            <span style={{ textDecoration: 'line-through' }}>
              ${product.price.toFixed(2)}
            </span>
          )}
          <span>${product.discountedPrice.toFixed(2)}</span>
        </div>
        <div>
          <span>Rating: {product.rating}/5</span>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => {
          addItem(product)
          showToast(`${product.title} added to cart.`)
        }}
      >
        Add to cart
      </button>
    </article>
  )
}

export default ProductCard
