const userHandler = require('../data/userHandler')

const validateUserField = (options) => (req, res, next) => {
  let userField = req.param(options.field)
  if (!userField) return res.status(400).send(`Missing field ${options.field}`);

  // Make sure it's a real token and add it to the request.
  let foundUser = userHandler.find(options.field, userField);
  if (!foundUser) return res.status(400).send(`No user holds the ${options.field} supplied.`);
  req.user = foundUser;

  next()
}

module.exports = {
  validateUserField
};