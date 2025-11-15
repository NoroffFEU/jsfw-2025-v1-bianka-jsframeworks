interface CartSummaryProps {
  totalItems: number
  totalCost: number
  onCheckout: () => void
}

function CartSummary({ totalItems, totalCost, onCheckout }: CartSummaryProps) {
  return (
    <section>
      <h2>Order summary</h2>
      <p>Total items: {totalItems}</p>
      <p>Total cost: ${totalCost.toFixed(2)}</p>
      <button type="button" onClick={onCheckout} disabled={totalItems === 0}>
        Checkout
      </button>
    </section>
  )
}

export default CartSummary
