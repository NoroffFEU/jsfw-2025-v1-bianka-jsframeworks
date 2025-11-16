import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
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
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
        <span className="text-4xl">✅</span>
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Thank you for your purchase!</h1>
        <p className="text-base text-slate-600">
          Your order is confirmed and your cart has been cleared. A receipt has been sent to your email.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900"
        >
          Continue shopping
        </Link>
        <Link
          to="/contact"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Need help? Contact us
        </Link>
      </div>
    </main>
  )
}

export default CheckoutSuccessPage
