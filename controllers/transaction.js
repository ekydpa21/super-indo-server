const { Transaction } = require('../models');
const { plu } = require('../utils/codeGenerator');
const { transactionFormatter } = require('../utils/responseDateFormatter');

async function getAllTransactions(req, res, next) {
  try {
    const transactions = await Transaction.findAll({ order: [['createdAt', 'ASC']] });

    if (!transactions) {
      next({ name: 'Not Found' });
    }

    const data = !transactions?.length ? [] : transactionFormatter(transactions);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function getTransaction(req, res, next) {
  try {
    const transaction_id = +req.params.transaction_id;

    const transaction = await Transaction.findOne({ where: { transaction_id: transaction_id } });

    if (!transaction) {
      next({ name: 'Not Found' });
    }

    res.status(200).json({ success: true, data: transactionFormatter(transaction) });
  } catch (error) {
    next(error);
  }
}

async function addTransaction(req, res, next) {
  try {
    const UserName = req.user.name;

    const payload = {
      name: req.body.name,
      plu: await plu('add'),
      transaction_category_id: req.body.transaction_category_id,
      active: req.body.active,
      created_user: UserName,
      updated_user: UserName
    };

    const newTransaction = await Transaction.create(payload);
    const formatted = transactionFormatter(newTransaction);

    res.status(201).json({ success: true, data: formatted });
  } catch (error) {
    await plu('min');
    next(error);
  }
}

async function updateTransaction(req, res, next) {
  try {
    const transaction_id = +req.params.transaction_id;
    const UserName = req.user.name;

    const payload = {
      name: req.body.name,
      transaction_category_id: req.body.transaction_category_id,
      active: req.body.active,
      updated_user: UserName
    };

    const transaction = await Transaction.findOne({ where: { id: transaction_id } });

    if (!transaction) {
      next({ name: 'Not Found' });
    }

    await Transaction.update({ ...transaction, ...payload }, { where: { id: transaction_id } });

    res.status(200).json({ success: true, message: 'Transaction updated successfully' });
  } catch (error) {
    next(error);
  }
}

async function deleteTransaction(req, res, next) {
  try {
    const transaction_id = +req.params.transaction_id;

    const transaction = await Transaction.findOne({ where: { id: transaction_id } });

    if (!transaction) {
      next({ name: 'Not Found' });
    }

    await Transaction.destroy({ where: { id: transaction_id } });

    res.status(200).json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllTransactions, getTransaction, addTransaction, updateTransaction, deleteTransaction };
