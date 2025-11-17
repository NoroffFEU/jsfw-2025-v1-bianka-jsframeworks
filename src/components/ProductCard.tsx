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
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative">
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            -{discountPercentage}%
          </span>
        )}
        <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-xl bg-slate-50">
          <img
            src={product.image.url}
            alt={product.image.alt}
            className="h-56 w-full object-cover"
          />
        </Link>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-2">
        <Link to={`/product/${product.id}`} className="text-lg font-semibold text-slate-900">
          {product.title}
        </Link>
        <p className="text-sm text-slate-600">{product.description}</p>
        <div className="flex items-end gap-2 text-lg font-semibold text-slate-900">
          {hasDiscount && (
            <span className="text-sm font-normal text-slate-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span>${product.discountedPrice.toFixed(2)}</span>
        </div>
        <p className="text-sm text-amber-600">Rating: {product.rating}/5</p>
      </div>

      <button
        type="button"
        onClick={() => {
          addItem(product)
          showToast(`${product.title} added to cart.`)
        }}
        className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Add to cart
      </button>
    </article>
  )
}

export default ProductCard
