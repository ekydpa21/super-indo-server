const { Product } = require('../models');
const { plu } = require('../utils/codeGenerator');
const { productFormatter } = require('../utils/responseDateFormatter');

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'ASC']] });

    if (!products) {
      next({ name: 'Not Found' });
    }

    const data = !products?.length ? [] : productFormatter(products);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const product_id = +req.params.product_id;

    const product = await Product.findOne({ where: { product_id: product_id } });

    if (!product) {
      next({ name: 'Not Found' });
    }

    res.status(200).json({ success: true, data: productFormatter(product) });
  } catch (error) {
    next(error);
  }
}

async function addProduct(req, res, next) {
  try {
    const UserName = req.user.name;

    const payload = {
      name: req.body.name,
      plu: await plu('add'),
      product_category_id: req.body.product_category_id,
      active: req.body.active,
      created_user: UserName,
      updated_user: UserName
    };

    const newProduct = await Product.create(payload);
    const formatted = productFormatter(newProduct);

    res.status(201).json({ success: true, data: formatted });
  } catch (error) {
    await plu('min');
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product_id = +req.params.product_id;
    const UserName = req.user.name;

    const payload = {
      name: req.body.name,
      product_category_id: req.body.product_category_id,
      active: req.body.active,
      updated_user: UserName
    };

    const product = await Product.findOne({ where: { id: product_id } });

    if (!product) {
      next({ name: 'Not Found' });
    }

    await Product.update({ ...product, ...payload }, { where: { id: product_id } });

    res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product_id = +req.params.product_id;

    const product = await Product.findOne({ where: { id: product_id } });

    if (!product) {
      next({ name: 'Not Found' });
    }

    await Product.destroy({ where: { id: product_id } });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct };
