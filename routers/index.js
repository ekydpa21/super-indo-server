const router = require('express').Router();
const user = require('./user');
const menu = require('./menu');
const productCategory = require('./productCategory');
const product = require('./product');
const productVariant = require('./productVariant');
const cart = require('./cart');
const transaction = require('./transaction');
// const cartList = require("./cartList")
// const {authenticateCust} = require("../middlewares/auth")

router.use('/', user);
router.use('/', menu);
router.use('/', productVariant);
router.use('/', productCategory);
router.use('/', product);
router.use('/', cart);
router.use('/', transaction);
// router.use("/carts", authenticateCust, cartList)

module.exports = router;
