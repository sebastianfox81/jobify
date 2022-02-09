const express = require('express');
const router = express.Router();

const { register, login, updateUser, deleteUser, getAllUsers } = require('../controllers/authController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);
router.route('/deleteUser/:id').delete(deleteUser);
router.route('/getUsers').get(getAllUsers)

module.exports = router;
