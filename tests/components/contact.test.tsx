import '../setup'
import React from 'react'
import assert from 'node:assert/strict'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ContactField from '../../src/components/contact/ContactField'
import { createMockFunction } from '../helpers'

export function testContactFieldRendersInput() {
  const mock = createMockFunction<[string]>()
  render(<ContactField id="test" label="Test Field" value="" onChange={mock.fn} />)
  const input = screen.getByLabelText(/test field/i)
  fireEvent.change(input, { target: { value: 'hello' } })
  assert.strictEqual(mock.calls.length, 1)
  assert.strictEqual(mock.calls[0][0], 'hello')
  cleanup()
}

export function testContactFieldRendersTextarea() {
  const mock = createMockFunction<[string]>()
  render(<ContactField id="message" label="Message" type="textarea" value="" onChange={mock.fn} />)
  const textarea = screen.getByLabelText(/message/i)
  assert.ok(textarea)
  cleanup()
}

export function testContactFieldDisplaysError() {
  const mock = createMockFunction<[string]>()
  render(
    <ContactField id="email" label="Email" value="" error="Email is required" onChange={mock.fn} />
  )
  const errorText = screen.getByRole('alert')
  assert.ok(errorText.textContent?.includes('Email is required'))
  cleanup()
}

export function testContactFieldSetsAriaInvalid() {
  const mock = createMockFunction<[string]>()
  render(
    <ContactField id="name" label="Name" value="" error="Name is too short" onChange={mock.fn} />
  )
  const input = screen.getByLabelText(/name/i)
  assert.strictEqual(input.getAttribute('aria-invalid'), 'true')
  cleanup()
}
