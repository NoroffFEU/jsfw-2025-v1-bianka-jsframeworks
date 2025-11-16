interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="product-search" className="text-sm font-medium text-slate-700">
        Search products
      </label>
      <input
        id="product-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type to search"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-base text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
    </div>
  )
}

export default SearchBar
