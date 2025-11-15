import type { Product } from '../../types/product'
import useCart from '../../hooks/useCart'
import useToast from '../../hooks/useToast'

interface ProductPurchaseActionsProps {
  product: Product
}

function ProductPurchaseActions({ product }: ProductPurchaseActionsProps) {
  const { addItem } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    showToast(`${product.title} added to cart.`)
  }

  return (
    <section>
      <button type="button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </section>
  )
}

export default ProductPurchaseActions
