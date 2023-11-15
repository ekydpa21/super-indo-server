const { Menu } = require('../models');
const { checkToken } = require('../helpers/jwt');
const { Op } = require('sequelize');

async function getMenus(req, res, next) {
  try {
    let decoded = checkToken(req.headers.access_token);
    const role = decoded.role;

    const menus = await Menu.findAll({ attributes: ['name', 'url', 'allowed_role'], where: { allowed_role: { [Op.contains]: [role] } } });

    if (!menus) {
      next({ name: 'Not Found' });
    }

    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    next(error);
  }
}

module.exports = { getMenus };
