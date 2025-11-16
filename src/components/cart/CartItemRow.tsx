import type { CartItem } from '../../types/product'

interface CartItemRowProps {
  item: CartItem
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const handleDecrease = () => {
    const nextQuantity = item.quantity - 1
    if (nextQuantity <= 0) {
      onRemove(item.id)
      return
    }
    onQuantityChange(item.id, nextQuantity)
  }

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1)
  }

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
        <p className="text-sm text-slate-600">Price: ${item.discountedPrice.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1">
          <button
            type="button"
            onClick={handleDecrease}
            aria-label={`Decrease quantity for ${item.title}`}
            className="text-lg font-semibold text-slate-700"
          >
            -
          </button>
          <span className="text-base font-semibold text-slate-900">{item.quantity}</span>
          <button
            type="button"
            onClick={handleIncrease}
            aria-label={`Increase quantity for ${item.title}`}
            className="text-lg font-semibold text-slate-700"
          >
            +
          </button>
        </div>
        <p className="text-sm font-semibold text-slate-900">
          Subtotal: ${(item.discountedPrice * item.quantity).toFixed(2)}
        </p>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-sm font-semibold text-red-600"
        >
          Remove
        </button>
      </div>
    </article>
  )
}

export default CartItemRow
