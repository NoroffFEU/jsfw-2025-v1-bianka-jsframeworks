import type { CartItem } from '../../types/product'
import CartItemRow from './CartItemRow'

interface CartItemsListProps {
  items: CartItem[]
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

function CartItemsList({ items, onQuantityChange, onRemove }: CartItemsListProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
        Your cart is empty.
      </p>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Cart items</h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  )
}

export default CartItemsList
