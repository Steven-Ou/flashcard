import { NextResponse } from 'next/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export async function POST(req){
    const params: = {
        submit_type: 'subsciption',
        payment_method_types: ['card'],
        line_items: [
          {
            name: ' ',
            amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      };
      const checkoutSession:  =
        await stripe.checkout.sessions.create(params);

}