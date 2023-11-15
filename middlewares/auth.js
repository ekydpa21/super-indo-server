const { checkToken } = require('../helpers/jwt');
const { User, Product, Cart } = require('../models');

async function authenticate(req, res, next) {
  try {
    if (!req.headers.access_token) {
      next({ name: `Not Authorized` });
    } else {
      let decoded = checkToken(req.headers.access_token);
      let find = await User.findOne({ where: { username: decoded.username } });
      if (find?.role === 'administrator') {
        req.user = {
          id: find.id,
          name: find.name
        };
        next();
      } else if (find?.role !== 'administrator') {
        next({ name: `Not Authorized` });
      } else {
        next({ name: `Not Found` });
      }
    }
  } catch (err) {
    next(err);
  }
}

async function authenticateCust(req, res, next) {
  try {
    if (!req.headers.access_token) {
      next({ name: `Not Authorized` });
    } else {
      let decoded = checkToken(req.headers.access_token);
      let find = await User.findOne({ where: { username: decoded.username } });
      if (find && find.role === 'customer') {
        req.user = {
          id: find.id,
          name: find.name
        };
        next();
      } else {
        next({ name: `Not Found` });
      }
    }
  } catch (err) {
    next(err);
  }
}

async function authorize(req, res, next) {
  try {
    let data = await Product.findOne({ where: { id: +req.params.id } });
    if (!data) {
      next({ name: `Not Found` });
    } else if (data.user_id !== req.user.id) {
      next({ name: `Not Authorized` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function authorizeCust(req, res, next) {
  try {
    let data = await Cart.findOne({ where: { id: +req.params.id } });
    if (!data) {
      next({ name: `Not Found` });
    } else if (data.UserId !== req.user.id) {
      next({ name: `Not Authorized` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { authenticate, authenticateCust, authorize, authorizeCust };
