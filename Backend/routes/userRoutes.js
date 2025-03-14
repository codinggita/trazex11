const express = require('express');
const router = express.Router();
const userController = require('../controllers/authControllers');

router.post('/users/login', userController.loginUser);
router.post('/users', userController.registerUser);
router.get('/users/:id', userController.getUserById);
router.get('/users/username/:username', userController.getUserByUsername);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;
