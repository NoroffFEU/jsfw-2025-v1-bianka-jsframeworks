import '../setup'
import React from 'react'
import assert from 'node:assert/strict'
import { cleanup, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import Navbar from '../../src/components/Navbar'
import CartProvider from '../../src/context/CartProvider'

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </CartProvider>
  )
}

export function testNavbarRendersLinks() {
  render(
    <TestWrapper>
      <Navbar />
    </TestWrapper>
  )
  assert.ok(screen.getByText(/Noroff Shop/))
  assert.ok(screen.getByText(/Home/))
  assert.ok(screen.getByText(/Contact/))
  assert.ok(screen.getByText(/Cart \(0\)/))
  cleanup()
}

export function testNavbarDisplaysCartCount() {
  render(
    <TestWrapper>
      <Navbar />
    </TestWrapper>
  )
  const cartLink = screen.getByText(/Cart \(0\)/)
  assert.ok(cartLink, 'Navbar should display cart count')
  cleanup()
}
