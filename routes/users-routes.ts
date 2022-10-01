import express from 'express';
import { check } from 'express-validator';

const userController = require('../controllers/users-controller')

const router = express.Router();

router.get('/:wallet', userController.getUser);

router.get('/getUserByDeviceId/:deviceId', userController.getUserByDeviceId);

router.post('/signup', [check('username').not().isEmpty(), check('password').not().isEmpty()], userController.signup);

router.post('/login', userController.login);

router.put('/updateLoggedTo', userController.updateLoggedTo);

module.exports = router;
