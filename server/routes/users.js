var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this users router');
});

router.post('/register', userController.register)
router.post('/login', userController.signin)

router.get('/profile', userController.showProfile)
router.put('/profile', userController.editProfile)
router.get('/showUser', userController.showAllUser)



// router.get('/all', userController.findAllUser)
// router.get('/showAll', userController.showAllUserTodos)
// router.get('/profile',userController.viewProfile)
// router.put('/edit', userController.updateUser)
// router.delete('/deleteProfile', userController.deleteUser)

module.exports = router;

