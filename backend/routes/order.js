const express = require('express')
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder

} = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, (req, res) => newOrder(req,res));

router.get('/order/:id', isAuthenticatedUser, (req, res) => getSingleOrder(req,res));
router.get('/orders/me', isAuthenticatedUser, (req, res) => myOrders(req,res));

router.get('/admin/orders/', isAuthenticatedUser, authorizeRoles, (req, res) => allOrders(req,res));

router.put('/admin/order/:id', isAuthenticatedUser, authorizeRoles, (req, res) => updateOrder(req,res));
router.delete('/admin/order/:id', isAuthenticatedUser, authorizeRoles, (req, res) => deleteOrder(req,res));

module.exports = router;