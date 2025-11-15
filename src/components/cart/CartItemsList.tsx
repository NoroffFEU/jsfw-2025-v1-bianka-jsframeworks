import type { CartItem } from '../../types/product'
import CartItemRow from './CartItemRow'

interface CartItemsListProps {
  items: CartItem[]
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

function CartItemsList({ items, onQuantityChange, onRemove }: CartItemsListProps) {
  if (items.length === 0) {
    return <p>Your cart is empty.</p>
  }

  return (
    <section>
      <h2>Cart items</h2>
      {items.map((item) => (
        <CartItemRow
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </section>
  )
}

export default CartItemsList
