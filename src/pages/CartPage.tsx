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
    <div>
      <h1>Cart Page</h1>
      <CartItemsList items={items} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
      <CartSummary totalItems={totalItems} totalCost={totalCost} onCheckout={handleCheckout} />
    </div>
  )
}

export default CartPage
