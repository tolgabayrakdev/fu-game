import express from 'express';
import AuthController from '../controller/auth-controller.js';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));
router.get('/verify', authController.verifyUser.bind(authController));
router.get('/logout', authController.logout.bind(authController));

export default router;