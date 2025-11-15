import { createContext } from 'react'
import type { CartItem, Product } from '../types/product'

export interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalCost: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)
