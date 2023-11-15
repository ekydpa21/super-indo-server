const { Cart, ProductVariant, Transaction, TransactionDetail, sequelize } = require('../models');
const { transactionCode } = require('../utils/codeGenerator');

async function getAllCarts(req, res, next) {
  try {
    const UserId = req.user.id;
    const carts = await Cart.findAll({
      attributes: ['id', 'UserId', 'ProductVariantId', 'quantity', 'status'],
      where: { UserId, status: 'unpaid' },
      include: ProductVariant,
      order: [['createdAt', 'desc']]
    });

    if (!carts) {
      next({ name: 'Not Found' });
    }

    res.status(200).json({ success: true, data: carts });
  } catch (error) {
    next(error);
  }
}

async function addCart(req, res, next) {
  try {
    const UserId = req.user.id;
    const ProductVariantId = req.body.product_variant_id;

    const existItemCart = await Cart.findOne({
      attributes: ['id', 'UserId', 'ProductVariantId', 'quantity', 'status'],
      where: { UserId, ProductVariantId, status: 'unpaid' },
      include: ProductVariant
    });

    if (!existItemCart) {
      const cart = await Cart.create({ UserId, ProductVariantId });
      res.status(201).json({ success: true, data: cart });
    } else {
      const updateQuantity = {
        quantity: existItemCart.quantity + 1
      };
      await Cart.update(updateQuantity, { where: { id: existItemCart.id } });
      res.status(200).json({ success: true, message: 'Item added to cart' });
    }
  } catch (error) {
    next(error);
  }
}

async function addQuantity(req, res, next) {
  try {
    const id = +req.params.id;

    const item = await Cart.findOne({ where: { id } });

    if (!item) {
      next({ name: 'Not Found' });
    }

    const updateQuantity = {
      quantity: item.quantity + 1
    };

    await Cart.update(updateQuantity, { where: { id } });
    res.status(200).json({ success: true, message: 'Item added' });
  } catch (error) {
    next(error);
  }
}

async function reduceQuantity(req, res, next) {
  try {
    const id = +req.params.id;

    const item = await Cart.findOne({ where: { id } });

    if (!item) {
      next({ name: 'Not Found' });
    }

    const updateQuantity = {
      quantity: item.quantity - 1
    };

    await Cart.update(updateQuantity, { where: { id } });
    res.status(200).json({ success: true, message: 'Item reduced' });
  } catch (error) {
    next(error);
  }
}

async function deleteCart(req, res, next) {
  try {
    const id = +req.params.id;

    const cart = await Cart.findOne({ where: { id } });

    if (!cart) {
      next({ name: 'Not Found' });
    }

    await Cart.destroy({ where: { id } });

    res.status(200).json({ success: true, message: 'Cart deleted successfully' });
  } catch (error) {
    next(error);
  }
}

async function checkout(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const UserId = req.user.id;
    const UserName = req.user.name;

    const carts = await Cart.findAll(
      {
        where: {
          UserId,
          status: 'unpaid'
        },
        include: ProductVariant
      },
      {
        transaction: t
      }
    );

    if (!carts) {
      next({ name: 'Not Found' });
    }

    const total_amount = carts?.reduce((accumulator, currentValue) => accumulator + currentValue?.quantity * currentValue?.ProductVariant?.price, 0) || 0;
    const transactionPayload = {
      transaction_no: await transactionCode('add'),
      total_amount,
      active: true,
      created_user: UserName,
      updated_user: UserName
    };
    const transaction = await Transaction.create(transactionPayload);

    for (const cart of carts) {
      const productVariant = await ProductVariant.findByPk(cart.ProductVariantId);
      if (cart.quantity > productVariant.qty) {
        throw { msg: 'Your amount item is more than stock' };
      } else {
        const transactionDetailPayload = {
          TransactionId: transaction.id,
          ProductVariantId: productVariant.id,
          price: productVariant.price,
          qty: cart.quantity,
          subtotal: cart.quantity * productVariant.price,
          active: true,
          created_user: UserName,
          updated_user: UserName
        };
        let stock = productVariant.qty - cart.quantity;
        await ProductVariant.update({ qty: stock }, { where: { id: cart.ProductVariantId } }, { transaction: t });
        await Cart.update({ status: 'paid' }, { where: { UserId, ProductVariantId: cart.ProductVariantId, status: 'unpaid' } });
        await TransactionDetail.create(transactionDetailPayload);
      }
    }
    t.afterCommit((_) => {
      return res.status(200).json({ status: true, message: 'Thank you, your transaction is done' });
    });
    await t.commit();
  } catch (err) {
    await t.rollback();
    await transactionCode('min');
    next(err);
  }
}

module.exports = { getAllCarts, addCart, addQuantity, reduceQuantity, deleteCart, checkout };
