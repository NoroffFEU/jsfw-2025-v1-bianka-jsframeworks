import { Link } from 'react-router'
import useCart from '../hooks/useCart'

function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({totalItems})</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}

export default Navbar
