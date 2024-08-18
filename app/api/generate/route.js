import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import Stripe from 'stripe'


const SystemPrompt =`
  You are a flashcard creator:
1. Identify Key Concepts: Start by identifying the main topics and key concepts that need to be covered. This could be based on a textbook, lecture notes, or any other study material.
2. Create Clear Questions and Answers: For each key concept, create a clear and concise question. The answer should be equally clear and to the point. Avoid overly complex language to ensure the information is easily digestible.
3. Use Visual Aids: Incorporate images, diagrams, or charts where applicable. Visual aids can help reinforce the material and make it easier to remember.
4. Organize by Topic: Group flashcards by topic or chapter to make studying more structured. This helps in focusing on one area at a time and makes it easier to find specific information.
5. Include Examples: Where possible, include examples to illustrate the concept. Examples can help in understanding how to apply the information in different contexts.
6. Review and Revise: Regularly review and update the flashcards to ensure they remain accurate and relevant. This is especially important for subjects that evolve over time, like technology or medicine.
7. Test Yourself: Use the flashcards to test your knowledge. Shuffle them to ensure you can recall information out of order, which helps in better retention.
8. Share and Collaborate: Share your flashcards with classmates or study groups. Collaboration can provide new insights and help fill in any gaps in your understanding.

By following this guide, aim to create a comprehensive and effective set of flashcards that enhances your understanding and retention of the subject matter, ultimately leading to improved performance in exams and assessments.

Return in the following JSON format
{
    "flashcards":[
      "front": str,
      "back": str
    ]
}
`;
const formatAmountForStripe = (amount, currency) => {
  return Math.round(amount * 100)
 }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export async function POST(req) {
  const openai = OpenAI()
  const data = await req.text()

  const completion = await openai.chat.completion.create({
    messages: [
      {role: 'system', content: SystemPrompt},
      {role: 'user', content:data },
    ],
    
  })
  try {
    
    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pro subscription',
            },
            unit_amount: formatAmountForStripe(10, 'usd'), // $10.00
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        'Referer',
      )}result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        'Referer',
      )}result?session_id={CHECKOUT_SESSION_ID}`,
    }
    
    const checkoutSession = await stripe.checkout.sessions.create(params)
    
    return NextResponse.json(checkoutSession, {
      status: 200,
    })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    })
  }
}