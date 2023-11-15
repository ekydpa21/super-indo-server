const { ProductCategory } = require('../models');
const { plu } = require('../utils/codeGenerator');
const { categoryFormatter } = require('../utils/responseDateFormatter');

async function getProductCategories(req, res, next) {
  try {
    const productCategories = await ProductCategory.findAll({ order: [['createdAt', 'ASC']] });

    if (!productCategories) {
      next({ name: 'Not Found' });
    }

    const data = !productCategories?.length ? [] : categoryFormatter(productCategories);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function addProductCategory(req, res, next) {
  try {
    const UserName = req.user.name;
    const payload = {
      name: req.body.name,
      active: req.body.active,
      created_user: UserName,
      updated_user: UserName
    };

    const newProductCategory = await ProductCategory.create(payload);
    const formattedCategories = categoryFormatter(newProductCategory);

    res.status(201).json({ success: true, data: formattedCategories });
  } catch (error) {
    next(error);
  }
}

async function updateProductCategory(req, res, next) {
  try {
    const category_id = +req.params.category_id;
    const UserName = req.user.name;
    const payload = {
      name: req.body.name,
      active: req.body.active,
      updated_user: UserName
    };

    const category = await ProductCategory.findOne({ where: { id: category_id } });

    if (!category) {
      next({ name: 'Not Found' });
    }

    await ProductCategory.update({ ...category, ...payload }, { where: { id: category_id } });

    res.status(200).json({ success: true, message: 'Category updated successfully' });
  } catch (error) {
    next(error);
  }
}

async function deleteProductCategory(req, res, next) {
  try {
    const category_id = +req.params.category_id;

    const category = await ProductCategory.findOne({ where: { id: category_id } });

    if (!category) {
      next({ name: 'Not Found' });
    }

    await ProductCategory.destroy({ where: { id: category_id } });

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProductCategories, addProductCategory, updateProductCategory, deleteProductCategory };
