import { NextApiRequest, NextApiResponse } from 'next'

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
import { validateCartItems } from 'use-shopping-cart/src/serverUtil'
import inventory from '../../../data/products.json'

import Stripe from 'stripe'
import { CartEntry, Product } from 'use-shopping-cart'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

const formatBody = (cartItems: CartEntry) => {
  return cartItems.reduce((ci: CartEntry, p: Product) => ({ ...ci, [p.sku]: p}), {})
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Validate the cart details that were sent from the client.
      const cartItems = formatBody(req.body)
      console.log(cartItems);
      // remove images from Inventory for Stripe object
      let inventoryNoImages = inventory.map(({ image, ...rest }) => rest);

      const line_items = validateCartItems(inventoryNoImages, cartItems)
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      }
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
// {
//     "sku_cource_1": {
//         "name": "Course Name First",
//         "sku": "sku_cource_1",
//         "price": 220,
//         "image": "/cource-placeholder@4x.jpg",
//         "currency": "USD",
//         "id": "sku_cource_1",
//         "quantity": 1,
//         "value": 220,
//         "formattedValue": "US$2.20"
//     }
// }