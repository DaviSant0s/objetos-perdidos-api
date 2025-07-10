const {
    validateName,
    validateDescription,
    validateCategory,
} = require('../../validators/object');


const validateCreateObject = (req, res, next) => {

    const { name, description, category } = req.body;
    
    const objectErrorMessage = (message) => {
        return {
            error: "@object/create",
            message: message
        };
    }

    const errors = [
        validateName(name),
        validateDescription(description),
        validateCategory(category)
    ].filter(Boolean);

    if (errors.length > 0){
        return res.status(400).json(objectErrorMessage(errors[0]));
    }

    return next();

}

module.exports = {
    validateCreateObject,
}