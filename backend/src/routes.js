
const express = require('express');

const UsersController = require('./controllers/UsersController');
const WalletController = require('./controllers/WalletController')

const routes = express.Router();

routes.get('/auth/list', UsersController.list);
routes.get('/auth/login', UsersController.listOne);
routes.post('/auth/signup', UsersController.create);
routes.delete('/auth/', UsersController.delete);


routes.post('/wallet/new', WalletController.create);
routes.get('/wallet', WalletController.list);
routes.delete('/wallet/:id', WalletController.delete);

module.exports = routes;
