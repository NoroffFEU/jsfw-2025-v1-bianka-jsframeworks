import React from 'react'
import { Link } from 'react-router'
import useCart from '../hooks/useCart'

function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold text-slate-900">
          Noroff Shop
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <Link to="/" className="transition hover:text-slate-900">
            Home
          </Link>
          <Link to="/contact" className="transition hover:text-slate-900">
            Contact
          </Link>
          <Link
            to="/cart"
            className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
