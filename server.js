const express = require('express');
const stripe = require('stripe')('sk_test_REEMPLAZA_CON_TU_CLAVE_SECRETA'); // REEMPLAZA CON TU CLAVE SECRETA
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { price, name, currency } = req.body;
        
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
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/#services`,
            metadata: {
                service_name: name,
                price: price.toString()
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(400).json({ error: error.message });
    }
});

// Success page
app.get('/success', async (req, res) => {
    const { session_id } = req.query;
    
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pago Exitoso - MyAppLab</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background: #f1f5f9;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    .success-container {
                        background: #ffffff;
                        border-radius: 20px;
                        padding: 3rem;
                        text-align: center;
                        box-shadow: 
                            15px 15px 40px rgba(148, 163, 184, 0.3),
                            -15px -15px 40px rgba(255, 255, 255, 0.9);
                        max-width: 500px;
                    }
                    .success-icon {
                        font-size: 4rem;
                        color: #10b981;
                        margin-bottom: 1rem;
                    }
                    .success-title {
                        color: #1e293b;
                        font-size: 2rem;
                        margin-bottom: 1rem;
                    }
                    .success-message {
                        color: #64748b;
                        font-size: 1.1rem;
                        margin-bottom: 2rem;
                        line-height: 1.6;
                    }
                    .btn {
                        background: #3b82f6;
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 12px;
                        text-decoration: none;
                        display: inline-block;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    .btn:hover {
                        background: #2563eb;
                        transform: translateY(-2px);
                    }
                </style>
            </head>
            <body>
                <div class="success-container">
                    <div class="success-icon">✅</div>
                    <h1 class="success-title">¡Pago Exitoso!</h1>
                    <p class="success-message">
                        Gracias por tu compra. Hemos recibido tu pago por <strong>${session.metadata.service_name}</strong>.
                        <br><br>
                        Te contactaremos en las próximas 24 horas para comenzar el desarrollo de tu proyecto.
                        <br><br>
                        ID de transacción: ${session.id}
                    </p>
                    <a href="/" class="btn">Volver al inicio</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Error retrieving session:', error);
        res.redirect('/?payment=error');
    }
});

app.listen(port, () => {
    console.log(`MyAppLab server running at http://localhost:${port}`);
    console.log('Remember to replace the Stripe keys with your actual keys!');
});