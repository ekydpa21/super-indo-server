const router = require('express').Router();
const { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { authenticate } = require('../middlewares/auth');

router.get('/products', authenticate, getAllProducts);
router.get('/product', authenticate, getProduct);
router.post('/product/add-product', authenticate, addProduct);
router.put('/product/update-product/:product_id', authenticate, updateProduct);
router.delete('/product/delete-product/:product_id', authenticate, deleteProduct);

module.exports = router;
