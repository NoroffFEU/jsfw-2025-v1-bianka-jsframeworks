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
    <div>
      <h2>Search results</h2>
      <ul>
        {results.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`} onClick={onResultSelect}>
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults
