const userHandler = require('../data/userHandler')

const validateUserToken = (req, res, next) => {
  let userToken = req.param('userToken')
  if (!userToken) return res.status(400).send('Missing user token');

  // Make sure it's a real token and add it to the request.
  let foundUser = userHandler.find('token', userToken);
  if (!foundUser) return res.status(400).send('No user holds the token supplied.')
  req.user = foundUser;

  next()
}

module.exports = {
  validateUserToken
};