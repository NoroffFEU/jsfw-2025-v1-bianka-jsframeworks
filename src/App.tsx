import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
