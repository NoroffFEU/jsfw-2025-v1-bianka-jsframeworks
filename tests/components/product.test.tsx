import '../setup'
import React from 'react'
import assert from 'node:assert/strict'
import { cleanup, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import ProductCard from '../../src/components/ProductCard'
import ProductGrid from '../../src/components/ProductGrid'
import CartProvider from '../../src/context/CartProvider'
import ToastProvider from '../../src/context/ToastProvider'
import { createMockProduct } from '../helpers'

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </CartProvider>
    </ToastProvider>
  )
}

export function testProductCardRendersCorrectly() {
  const product = createMockProduct({
    title: 'Sample Product',
    price: 100,
    discountedPrice: 80,
    rating: 4.5,
  })
  render(
    <TestWrapper>
      <ProductCard product={product} />
    </TestWrapper>
  )
  assert.ok(screen.getByText('Sample Product'))
  assert.ok(screen.getByText('$80.00'))
  assert.ok(screen.getByText('$100.00'))
  assert.ok(screen.getByText(/Rating: 4.5/))
  assert.ok(screen.getByText('-20%'))
  cleanup()
}

export function testProductCardWithoutDiscount() {
  const product = createMockProduct({
    title: 'No Discount Product',
    price: 50,
    discountedPrice: 50,
  })
  render(
    <TestWrapper>
      <ProductCard product={product} />
    </TestWrapper>
  )
  assert.ok(screen.getByText('No Discount Product'))
  assert.ok(screen.getByText('$50.00'))
  assert.throws(() => screen.getByText(/-%/), 'Discount badge should not appear')
  cleanup()
}

export function testProductGridRendersMultipleProducts() {
  const products = [
    createMockProduct({ id: '1', title: 'Product 1' }),
    createMockProduct({ id: '2', title: 'Product 2' }),
  ]
  render(
    <TestWrapper>
      <ProductGrid products={products} />
    </TestWrapper>
  )
  assert.ok(screen.getByText('Product 1'))
  assert.ok(screen.getByText('Product 2'))
  cleanup()
}
