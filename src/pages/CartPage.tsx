import { useNavigate } from 'react-router'
import CartItemsList from '../components/cart/CartItemsList'
import CartSummary from '../components/cart/CartSummary'
import useCart from '../hooks/useCart'
import useToast from '../hooks/useToast'

function CartPage() {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, totalItems, totalCost } = useCart()
  const { showToast } = useToast()

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity)
  }

  const handleRemove = (id: string) => {
    removeItem(id)
    showToast('Item removed from cart')
  }

  const handleCheckout = () => {
    if (totalItems === 0) {
      return
    }

    navigate('/checkout-success', { state: { checkedOut: true } })
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row lg:items-start">
      <div className="flex-1">
        <CartItemsList items={items} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
      </div>
      <div className="w-full max-w-sm lg:sticky lg:top-24">
        <CartSummary
          totalItems={totalItems}
          totalCost={totalCost}
          onCheckout={handleCheckout}
        />
      </div>
    </main>
  )
}

export default CartPage
