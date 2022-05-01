const express = require('express')
const router = express.Router();

const {
    processPayment,
    sendStripApi
} = require('../controllers/paymentController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.post('/payment/process', isAuthenticatedUser, (req, res) => processPayment(req,res));
router.get('/stripeapi', isAuthenticatedUser, (req, res) => sendStripApi(req,res));

module.exports = router;