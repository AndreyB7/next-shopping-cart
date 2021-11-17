import { NextApiRequest, NextApiResponse } from "next";

import { validateCartItems } from "../../../utils/cartUtils";
import inventory from "../../../data/products.json";

import Stripe from "stripe";
import { CartEntry, Product } from "use-shopping-cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
});

const formatBody = (cartItems: CartEntry) => {
  return cartItems.reduce(
    (ci: CartEntry, p: Product) => ({ ...ci, [p.section_id]: p }),
    {}
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Validate the cart details that were sent from the client.
      const cartItems = formatBody(req.body);

      const line_items = validateCartItems(inventory, cartItems);
      // Create Checkout Sessions from body params.

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 9000,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
