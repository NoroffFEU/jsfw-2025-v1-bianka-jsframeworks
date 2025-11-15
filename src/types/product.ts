export interface ProductImage {
  url: string
  alt: string
}

export interface Review {
  id: string
  username: string
  rating: number
  description: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  discountedPrice: number
  image: ProductImage
  rating: number
  tags: string[]
  reviews: Review[]
}

export interface CartItem {
  id: string
  title: string
  price: number
  discountedPrice: number
  image: ProductImage
  quantity: number
}

export interface ProductsResponse {
  data: Product[]
  meta: {
    isFirstPage: boolean
    isLastPage: boolean
    currentPage: number
    previousPage: number | null
    nextPage: number | null
    pageCount: number
    totalCount: number
  }
}
