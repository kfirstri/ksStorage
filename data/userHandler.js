const usersData = require('./users')

const find = (field, text) => {
  // Assuming username & token are unique return the first or false
  let foundUser = usersData.filter((user) => user[field] === text)[0]
  return foundUser ? foundUser : false;
}

module.exports = {
  find
}