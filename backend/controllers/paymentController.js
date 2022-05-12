const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    console.log('processPayment API CALLED');
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'eur',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
    console.log('sendStripApi API CALLED');
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})