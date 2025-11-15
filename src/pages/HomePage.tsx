import { useEffect, useMemo, useState } from 'react'
import type { Product } from '../types/product'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/home/SearchBar'
import SortControls, { type SortOption } from '../components/home/SortControls'
import SearchResults from '../components/home/SearchResults'

function sortProducts(products: Product[], sortOption: SortOption) {
  const productsCopy = [...products]

  return productsCopy.sort((a, b) => {
    switch (sortOption) {
      case 'name-asc':
        return a.title.localeCompare(b.title)
      case 'name-desc':
        return b.title.localeCompare(a.title)
      case 'price-asc':
        return a.discountedPrice - b.discountedPrice
      case 'price-desc':
        return b.discountedPrice - a.discountedPrice
      default:
        return 0
    }
  })
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('name-asc')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://v2.api.noroff.dev/online-shop')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products
    }

    const lowerQuery = searchQuery.toLowerCase()
    return products.filter((product) =>
      product.title.toLowerCase().includes(lowerQuery),
    )
  }, [products, searchQuery])

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortOption),
    [filteredProducts, sortOption],
  )

  const searchResults = searchQuery.trim() ? filteredProducts : []

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <SortControls value={sortOption} onChange={setSortOption} />
      <SearchResults results={searchResults} onResultSelect={() => setSearchQuery('')} />
      {sortedProducts.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <ProductGrid products={sortedProducts} />
      )}
    </div>
  )
}

export default HomePage
