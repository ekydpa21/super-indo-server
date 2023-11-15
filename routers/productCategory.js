const router = require('express').Router();
const { getProductCategories, addProductCategory, updateProductCategory, deleteProductCategory } = require('../controllers/productCategory');
const { authenticate } = require('../middlewares/auth');

router.get('/categories', authenticate, getProductCategories);
router.post('/category/add-category', authenticate, addProductCategory);
router.put('/category/update-category/:category_id', authenticate, updateProductCategory);
router.delete('/category/delete-category/:category_id', authenticate, deleteProductCategory);

module.exports = router;
