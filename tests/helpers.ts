import type { Product } from '../src/types/product'

export function createMockProduct(overrides?: Partial<Product>): Product {
  return {
    id: '1',
    title: 'Test Product',
    description: 'Test description',
    price: 100,
    discountedPrice: 80,
    image: { url: 'https://example.com/image.jpg', alt: 'Test' },
    rating: 4.5,
    tags: ['test'],
    reviews: [],
    ...overrides,
  }
}

export function createMockFunction<Args extends unknown[]>() {
  const calls: Args[] = []
  const fn = (...args: Args) => calls.push(args)
  return { fn, calls }
}
