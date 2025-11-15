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
    <article>
      <h3>{item.title}</h3>
      <p>Price: ${item.discountedPrice.toFixed(2)}</p>
      <div>
        <button type="button" onClick={handleDecrease} aria-label={`Decrease quantity for ${item.title}`}>
          -
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={handleIncrease} aria-label={`Increase quantity for ${item.title}`}>
          +
        </button>
      </div>
      <p>Subtotal: ${(item.discountedPrice * item.quantity).toFixed(2)}</p>
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </article>
  )
}

export default CartItemRow
