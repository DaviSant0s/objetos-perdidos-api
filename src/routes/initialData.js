const { Router } = require('express');
const routes = Router();

const { initialData } = require('../controllers/initialData');

routes.post('/initialdata', initialData);

module.exports = routes;