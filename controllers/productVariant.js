const { ProductVariant } = require('../models');
const { codeVariant } = require('../utils/codeGenerator');
const { productVariantFormatter } = require('../utils/responseDateFormatter');

async function getAllProductVariants(req, res, next) {
  try {
    const productVariants = await ProductVariant.findAll({ order: [['createdAt', 'ASC']] });

    if (!productVariants) {
      next({ name: 'Not Found' });
    }

    const data = !productVariants?.length ? [] : productVariantFormatter(productVariants);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function getProductVariant(req, res, next) {
  try {
    const product_variant_id = +req.params.product_variant_id;

    const productVariant = await ProductVariant.findOne({ where: { product_variant_id: product_variant_id } });

    if (!productVariant) {
      next({ name: 'Not Found' });
    }

    res.status(200).json({ success: true, data: productVariantFormatter(productVariant) });
  } catch (error) {
    next(error);
  }
}

async function addProductVariant(req, res, next) {
  try {
    const UserName = req.user.name;

    const payload = {
      product_id: req.body.product_id,
      code: await codeVariant(req.body.plu, 'add'),
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      active: req.body.active,
      image_url: req.body.image_url,
      created_user: UserName,
      updated_user: UserName
    };

    const newProductVariant = await ProductVariant.create(payload);
    const formatted = productVariantFormatter(newProductVariant);

    res.status(201).json({ success: true, data: formatted });
  } catch (error) {
    const plu = error?.parent?.parameters?.[1]?.slice(0, 11);
    await codeVariant(plu, 'min');
    next(error);
  }
}

async function updateProductVariant(req, res, next) {
  try {
    const product_variant_id = +req.params.product_variant_id;
    const UserName = req.user.name;

    const payload = {
      product_id: req.body.product_id,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      active: req.body.active,
      image_url: req.body.image_url,
      updated_user: UserName
    };

    const productVariant = await ProductVariant.findOne({ where: { id: product_variant_id } });

    if (!productVariant) {
      next({ name: 'Not Found' });
    }

    await ProductVariant.update({ ...productVariant, ...payload }, { where: { id: product_variant_id } });

    res.status(200).json({ success: true, message: 'Product Variant updated successfully' });
  } catch (error) {
    next(error);
  }
}

async function deleteProductVariant(req, res, next) {
  try {
    const product_variant_id = +req.params.product_variant_id;

    const productVariant = await ProductVariant.findOne({ where: { id: product_variant_id } });

    if (!productVariant) {
      next({ name: 'Not Found' });
    }

    await ProductVariant.destroy({ where: { id: product_variant_id } });

    res.status(200).json({ success: true, message: 'Product Variant deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllProductVariants, getProductVariant, addProductVariant, updateProductVariant, deleteProductVariant };
