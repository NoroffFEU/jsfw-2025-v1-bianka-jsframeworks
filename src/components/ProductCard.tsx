import { Link } from 'react-router';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.price > product.discountedPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <div>
        {hasDiscount && (
          <div>
            <span>-{discountPercentage}%</span>
          </div>
        )}
        <img src={product.image.url} alt={product.image.alt} />
        <h3>{product.title}</h3>
        <div>
          {hasDiscount && (
            <span style={{ textDecoration: 'line-through' }}>
              ${product.price.toFixed(2)}
            </span>
          )}
          <span>${product.discountedPrice.toFixed(2)}</span>
        </div>
        <div>
          <span>Rating: {product.rating}/5</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
