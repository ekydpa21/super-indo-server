const router = require('express').Router();
const { getAllTransactions, getTransaction, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction');
const { authenticate } = require('../middlewares/auth');

router.get('/transactions', authenticate, getAllTransactions);
router.get('/transaction', authenticate, getTransaction);
router.post('/transaction/add-transaction', authenticate, addTransaction);
router.put('/transaction/update-transaction/:transaction_id', authenticate, updateTransaction);
router.delete('/transaction/delete-transaction/:transaction_id', authenticate, deleteTransaction);

module.exports = router;
