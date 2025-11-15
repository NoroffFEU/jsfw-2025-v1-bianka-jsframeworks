export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

interface SortControlsProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <div>
      <label htmlFor="sort-products">Sort products</label>
      <select
        id="sort-products"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  )
}

export default SortControls
