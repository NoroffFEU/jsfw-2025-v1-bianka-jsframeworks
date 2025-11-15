interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div>
      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type to search"
      />
    </div>
  )
}

export default SearchBar
