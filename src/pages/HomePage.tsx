import { useEffect, useMemo, useState } from 'react'
import type { Product } from '../types/product'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/home/SearchBar'
import SortControls, { type SortOption } from '../components/home/SortControls'
import SearchResults from '../components/home/SearchResults'
import { getProducts } from '../services/onlineShop'

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
    const controller = new AbortController()

    const fetchProducts = async () => {
      try {
        const results = await getProducts(controller.signal)
        setProducts(results)
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return
        }
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    return () => controller.abort()
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
    return <div className="flex min-h-screen items-center justify-center text-lg text-slate-600">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg text-red-600">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-semibold text-slate-900">Browse Products</h1>
        <p className="text-base text-slate-600">Search, sort, and find the best deals available today.</p>
      </header>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SortControls value={sortOption} onChange={setSortOption} />
      </section>

      <SearchResults results={searchResults} onResultSelect={() => setSearchQuery('')} />

      {sortedProducts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
          No products match your search.
        </p>
      ) : (
        <ProductGrid products={sortedProducts} />
      )}
    </div>
  )
}

export default HomePage
