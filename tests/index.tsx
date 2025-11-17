import './setup'
import { testSearchBar, testSortControls } from './components/home.test'
import {
  testProductCardRendersCorrectly,
  testProductCardWithoutDiscount,
  testProductGridRendersMultipleProducts,
} from './components/product.test'
import {
  testCartSummaryDisplaysCorrectly,
  testCartSummaryCheckoutButton,
  testCartSummaryDisablesCheckoutWhenEmpty,
} from './components/cart.test'
import {
  testContactFieldRendersInput,
  testContactFieldRendersTextarea,
  testContactFieldDisplaysError,
  testContactFieldSetsAriaInvalid,
} from './components/contact.test'
import { testNavbarRendersLinks, testNavbarDisplaysCartCount } from './components/navbar.test'

type TestCase = [name: string, run: () => void]

const tests: TestCase[] = [
  ['SearchBar calls onChange when typing', testSearchBar],
  ['SortControls lists options and triggers change', testSortControls],
  ['ProductCard renders correctly with discount', testProductCardRendersCorrectly],
  ['ProductCard renders without discount badge', testProductCardWithoutDiscount],
  ['ProductGrid renders multiple products', testProductGridRendersMultipleProducts],
  ['CartSummary displays order details', testCartSummaryDisplaysCorrectly],
  ['CartSummary checkout button triggers callback', testCartSummaryCheckoutButton],
  ['CartSummary disables checkout when empty', testCartSummaryDisablesCheckoutWhenEmpty],
  ['ContactField renders input and handles change', testContactFieldRendersInput],
  ['ContactField renders textarea', testContactFieldRendersTextarea],
  ['ContactField displays error message', testContactFieldDisplaysError],
  ['ContactField sets aria-invalid when error exists', testContactFieldSetsAriaInvalid],
  ['Navbar renders navigation links', testNavbarRendersLinks],
  ['Navbar displays cart count', testNavbarDisplaysCartCount],
]

function runTests() {
  let passed = 0
  let failures = 0

  console.log('\nRunning tests...\n')

  tests.forEach(([name, run]) => {
    try {
      run()
      console.log(`✓ ${name}`)
      passed += 1
    } catch (error) {
      failures += 1
      console.error(`✗ ${name}`)
      if (error instanceof Error) {
        console.error(`  ${error.message}`)
      }
    }
  })

  console.log(`\n${passed} passed, ${failures} failed out of ${tests.length} tests`)

  if (failures > 0) {
    process.exitCode = 1
  }
}

runTests()
