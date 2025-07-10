const validator = require('validator');

const validateName = (name) => {

    if(validator.isEmpty(name)) return "Name is required";

    return null
}

const validateDescription = (description) => {

    if(validator.isEmpty(description)) return "Description is required";

    return null
}

const validateCategory = (category) => {

    if(validator.isEmpty(category)) return "Category is required";

    return null;

}

module.exports = {
    validateName,
    validateDescription,
    validateCategory,
}