import { NextPage } from 'next'
import Layout from '../components/Layout'

import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'
import Products from '../components/Products'

const CartPage: NextPage = () => {
  return (
    <Layout title="Shopping Cart">
        <Cart>
          <Products />
          <hr/>
          <CartSummary />
        </Cart>
    </Layout>
  )
}

export default CartPage
