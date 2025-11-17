import React from 'react'

interface CartSummaryProps {
  totalItems: number
  totalCost: number
  onCheckout: () => void
}

function CartSummary({ totalItems, totalCost, onCheckout }: CartSummaryProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
      <p className="mt-2 text-sm text-slate-600">Items: {totalItems}</p>
      <p className="text-lg font-bold text-slate-900">Total: ${totalCost.toFixed(2)}</p>
      <button
        type="button"
        onClick={onCheckout}
        disabled={totalItems === 0}
        className="mt-4 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        Checkout
      </button>
    </section>
  )
}

export default CartSummary
