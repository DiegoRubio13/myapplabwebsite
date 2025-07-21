const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { price, name, currency } = JSON.parse(event.body);
    const origin = event.headers.origin || event.headers.referer;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: currency || 'mxn',
          product_data: {
            name: name,
            description: `Desarrollo de ${name} por MyAppLab`,
          },
          unit_amount: price, // Price in centavos
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#services`,
      metadata: {
        service_name: name,
        price: price.toString()
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ id: session.id })
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
