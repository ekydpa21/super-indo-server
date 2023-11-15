const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      const errors = err.errors.map((err) => err.message);
      res.status(400).json({ success: false, message: errors });
      break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ success: false, message: 'Your input data already exists' });
      break;
    case 'errorLogin':
      res.status(401).json({ success: false, message: 'Wrong username / password' });
      break;
    case 'Not Authorized':
      res.status(401).json({ success: false, message: "You don't have access" });
      break;
    case 'Not Found':
      res.status(404).json({ success: false, message: 'Not Found' });
      break;
    default:
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      break;
  }
};

module.exports = errorHandler;
