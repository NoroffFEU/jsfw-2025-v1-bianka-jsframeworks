import React from 'react'
import { Link } from 'react-router'
import type { Product } from '../../types/product'

interface SearchResultsProps {
  results: Product[]
  onResultSelect?: () => void
}

function SearchResults({ results, onResultSelect }: SearchResultsProps) {
  if (!results.length) {
    return null
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Search results</h2>
        <span className="text-sm text-slate-500">{results.length} match(es)</span>
      </div>
      <ul className="mt-3 space-y-2">
        {results.map((product) => (
          <li key={product.id}>
            <Link
              to={`/product/${product.id}`}
              onClick={onResultSelect}
              className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <span>{product.title}</span>
              <span className="text-slate-500">${product.discountedPrice.toFixed(2)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SearchResults
