import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { Product } from '../types/product'
import { getProduct } from '../services/onlineShop'
import useCart from '../hooks/useCart'
import useToast from '../hooks/useToast'

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Product ID is missing')
      setLoading(false)
      return
    }

    const controller = new AbortController()

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await getProduct(id, controller.signal)
        setProduct(result)
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return
        }
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()

    return () => controller.abort()
  }, [id])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-lg text-slate-600">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg text-red-600">
        Error: {error}
      </div>
    )
  }

  if (!product) {
    return <div className="flex min-h-screen items-center justify-center text-lg text-slate-600">Product not found.</div>
  }

  const hasDiscount = product.price > product.discountedPrice

  const handleAddToCart = () => {
    addItem(product)
    showToast(`${product.title} added to cart.`)
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 px-4 py-10">
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <img
            src={product.image.url}
            alt={product.image.alt || product.title}
            className="h-full w-full max-h-112 rounded-xl object-cover"
          />
        </div>
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Product</p>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
          <p className="text-base text-slate-600">{product.description}</p>
          <div className="flex items-baseline gap-3 text-3xl font-bold text-slate-900">
            <span>${product.discountedPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-base font-semibold text-slate-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-amber-600">Rating: {product.rating}/5</p>
          {product.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              {product.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-slate-100 px-3 py-1">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Add to Cart
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Reviews</h2>
        {product.reviews.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No reviews yet. Be the first to share your thoughts.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {product.reviews.map((review) => (
              <li key={review.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-900">
                  <strong>{review.username}</strong>
                  <span className="text-xs font-semibold text-amber-600">Rating: {review.rating}/5</span>
                </div>
                <p className="mt-2 text-sm text-slate-700">{review.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default ProductDetailsPage
