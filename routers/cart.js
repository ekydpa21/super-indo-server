const router = require('express').Router();
const { getAllCarts, addCart, addQuantity, reduceQuantity, deleteCart, checkout } = require('../controllers/cart');
const { authenticateCust, authorizeCust } = require('../middlewares/auth');

// router.use(authenticateCust);
// router.use(authorizeCust);
router.get('/carts', authenticateCust, getAllCarts);
router.post('/cart/add', authenticateCust, addCart);
router.patch('/cart/:id/add', authenticateCust, authorizeCust, addQuantity);
router.patch('/cart/:id/reduce', authenticateCust, authorizeCust, reduceQuantity);
router.post('/cart/checkout', authenticateCust, checkout);
router.delete('/cart/:id/delete', authenticateCust, authorizeCust, deleteCart);

module.exports = router;
