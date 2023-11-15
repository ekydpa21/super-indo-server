const router = require('express').Router();
const { getAllProductVariants, getProductVariant, addProductVariant, updateProductVariant, deleteProductVariant } = require('../controllers/productVariant');
const { authenticate } = require('../middlewares/auth');

router.get('/product-variants', getAllProductVariants);
router.get('/product-variant', authenticate, getProductVariant);
router.post('/product-variant/add-product-variant', authenticate, addProductVariant);
router.put('/product-variant/update-product-variant/:product_variant_id', authenticate, updateProductVariant);
router.delete('/product-variant/delete-product-variant/:product_variant_id', authenticate, deleteProductVariant);

module.exports = router;
