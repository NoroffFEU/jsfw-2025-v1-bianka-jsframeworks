import { useEffect, useRef } from 'react'
import useCart from '../hooks/useCart'
import useToast from '../hooks/useToast'

function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const { showToast } = useToast()
  const hasHandledCheckout = useRef(false)

  useEffect(() => {
    if (hasHandledCheckout.current) {
      return
    }

    clearCart()
    showToast('Checkout successful!')
    hasHandledCheckout.current = true
  }, [clearCart, showToast])

  return (
    <div>
      <h1>Thank you for your purchase!</h1>
      <p>Your order is confirmed and your cart has been cleared.</p>
    </div>
  )
}

export default CheckoutSuccessPage
