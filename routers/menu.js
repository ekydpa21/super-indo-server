const router = require('express').Router();
const { getMenus } = require('../controllers/menu');

router.get('/menus', getMenus);

module.exports = router;
