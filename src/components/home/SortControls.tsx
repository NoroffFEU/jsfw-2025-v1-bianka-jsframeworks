import React from 'react'

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

interface SortControlsProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="sort-products" className="text-sm font-medium text-slate-700">
        Sort products
      </label>
      <select
        id="sort-products"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-base text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
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
