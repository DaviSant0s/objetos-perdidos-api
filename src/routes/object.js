const { Router } = require('express');
const routes = Router();

const { createObject, getObjects } = require('../controllers/object');
const { requiSignin, verifyAdmin } = require('../middlewares/verifyAuthentication');
const { validateCreateObject } = require('../middlewares/validation/object');

const upload = require('../configs/multer');

routes.post('/object/create', 
    requiSignin, verifyAdmin, 
    upload.array('objectPicture'), 
    validateCreateObject, 
    createObject
);

routes.get('/object/getObjects', getObjects);

module.exports = routes;