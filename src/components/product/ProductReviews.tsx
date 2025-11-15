import type { Review } from '../../types/product'

interface ProductReviewsProps {
  reviews: Review[]
}

function ProductReviews({ reviews }: ProductReviewsProps) {
  if (!reviews.length) {
    return (
      <section>
        <h2>Reviews</h2>
        <p>No reviews yet.</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.username}</strong>
            <p>Rating: {review.rating}/5</p>
            <p>{review.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductReviews
