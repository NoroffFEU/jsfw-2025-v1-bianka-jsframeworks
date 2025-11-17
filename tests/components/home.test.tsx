import '../setup'
import React from 'react'
import assert from 'node:assert/strict'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import SearchBar from '../../src/components/home/SearchBar'
import SortControls, { type SortOption } from '../../src/components/home/SortControls'
import { createMockFunction } from '../helpers'

export function testSearchBar() {
  const mock = createMockFunction<[string]>()
  render(<SearchBar value="" onChange={mock.fn} />)
  const input = screen.getByLabelText(/search products/i)
  fireEvent.change(input, { target: { value: 'phone' } })
  assert.strictEqual(mock.calls.length, 1)
  assert.strictEqual(mock.calls[0][0], 'phone')
  cleanup()
}

export function testSortControls() {
  const mock = createMockFunction<[SortOption]>()
  render(<SortControls value="name-asc" onChange={mock.fn} />)
  const select = screen.getByLabelText(/sort products/i)
  fireEvent.change(select, { target: { value: 'price-desc' } })
  assert.strictEqual(mock.calls.length, 1)
  assert.strictEqual(mock.calls[0][0], 'price-desc')
  cleanup()
}
