import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { Product } from '../types/product'
import ProductDescription from '../components/product/ProductDescription'
import ProductMedia from '../components/product/ProductMedia'
import ProductPricing from '../components/product/ProductPricing'
import ProductTags from '../components/product/ProductTags'
import ProductReviews from '../components/product/ProductReviews'
import ProductPurchaseActions from '../components/product/ProductPurchaseActions'

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Product ID is missing')
      setLoading(false)
      return
    }

    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product details')
        }

        const data = await response.json()
        setProduct(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!product) {
    return <div>Product not found.</div>
  }

  return (
    <div>
      <ProductDescription title={product.title} description={product.description} />
      <ProductMedia image={product.image} title={product.title} />
      <ProductPricing price={product.price} discountedPrice={product.discountedPrice} rating={product.rating} />
      <ProductTags tags={product.tags} />
      <ProductPurchaseActions product={product} />
      <ProductReviews reviews={product.reviews} />
    </div>
  )
}

export default ProductDetailsPage
