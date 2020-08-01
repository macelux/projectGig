 'use strict';

 module.exports = function(app) {
     let userController = require('../controllers/UserController');

     // user Routes
     app.route('/user')
         .get(userController.get_user)
         .post(userController.delete_user);

     app.route('/user/add')
         .get(userController.get_add_user)
         .post(userController.add_user);

     app.route('/user/:userId')
         .get(userController.add_user)
         .post(userController.delete_user);
 };