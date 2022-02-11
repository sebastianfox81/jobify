import express from 'express';
const router = express.Router();

import { register, login, updateUser, deleteUser, getAllUsers } from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);
router.route('/deleteUser/:id').delete(deleteUser);
router.route('/getUsers').get(getAllUsers)

export default router;
