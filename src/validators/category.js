const validator = require('validator');

const validateName = (name) => {
  console.log(name)
  if (!name || validator.isEmpty(name)) return 'Category name is required';

  return null;
};

module.exports = {
  validateName,
};
