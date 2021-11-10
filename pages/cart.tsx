import { NextPage } from 'next'
import Layout from '../components/Layout'

import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'
import Products from '../components/Products'
import { useRouter } from 'next/router'

const CartPage: NextPage = () => {
  const router = useRouter()
  const { c } = router.query  // get company slug from params
  return (
    <Layout title="Shopping Cart" company={c}>
        <Cart>
          <Products />
          <hr/>
          <CartSummary />
        </Cart>
        <pre>Query params:<br/>{JSON.stringify(router.query)}</pre>
    </Layout>
  )
}

export default CartPage
