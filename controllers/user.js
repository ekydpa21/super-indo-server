const { User } = require('../models');
const { compareHash } = require('../helpers/hash');
const { generateToken } = require('../helpers/jwt');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      next({ name: 'errorLogin' });
    }

    const matchPass = compareHash(password, user.password);

    if (!matchPass) {
      next({ name: 'errorLogin' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role
    };

    const access_token = generateToken(payload);
    return res.status(200).json({ name: user.name, username: user.username, role: user.role, access_token });
  } catch (error) {
    next(error);
  }
}

module.exports = { login };
