import express from 'express';
import { check } from 'express-validator';

const userController = require('../controllers/users-controller')

const router = express.Router();

router.get('/:wallet', userController.getUser);

router.get('/getUserByDeviceId/:deviceId', userController.getUserByDeviceId);

router.post('/signup', [check('username').not().isEmpty().isLength({min: 2, max: 9}), check('password').not().isEmpty().isLength({min: 6}).matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/).matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,200}$/).matches(/^(?=.*[A-Z])(?=\S+$).{6,200}$/)], userController.signup);

router.post('/login', userController.login);

router.put('/updateLoggedTo', userController.updateLoggedTo);

module.exports = router;
