var authController = require('../controllers/authController');
 
module.exports = function(app) {
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);
}