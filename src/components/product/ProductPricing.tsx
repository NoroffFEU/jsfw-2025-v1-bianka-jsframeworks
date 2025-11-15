interface ProductPricingProps {
  price: number
  discountedPrice: number
  rating: number
}

function ProductPricing({ price, discountedPrice, rating }: ProductPricingProps) {
  const hasDiscount = price > discountedPrice

  return (
    <section>
      <h2>Price</h2>
      <p>
        {hasDiscount && <span style={{ textDecoration: 'line-through' }}>${price.toFixed(2)}</span>}
        <span> ${discountedPrice.toFixed(2)}</span>
      </p>
      <p>Rating: {rating}/5</p>
    </section>
  )
}

export default ProductPricing
