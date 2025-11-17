import '../setup'
import React from 'react'
import assert from 'node:assert/strict'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import CartSummary from '../../src/components/cart/CartSummary'
import { createMockFunction } from '../helpers'

export function testCartSummaryDisplaysCorrectly() {
  const mock = createMockFunction<[]>()
  render(<CartSummary totalItems={3} totalCost={150} onCheckout={mock.fn} />)
  assert.ok(screen.getByText(/Order summary/))
  assert.ok(screen.getByText(/Items: 3/))
  assert.ok(screen.getByText(/Total: \$150.00/))
  cleanup()
}

export function testCartSummaryCheckoutButton() {
  const mock = createMockFunction<[]>()
  render(<CartSummary totalItems={2} totalCost={100} onCheckout={mock.fn} />)
  const button = screen.getByRole('button', { name: /checkout/i })
  assert.ok(button)
  fireEvent.click(button)
  assert.strictEqual(mock.calls.length, 1)
  cleanup()
}

export function testCartSummaryDisablesCheckoutWhenEmpty() {
  const mock = createMockFunction<[]>()
  render(<CartSummary totalItems={0} totalCost={0} onCheckout={mock.fn} />)
  const button = screen.getByRole('button', { name: /checkout/i })
  assert.ok(button.hasAttribute('disabled'))
  cleanup()
}
