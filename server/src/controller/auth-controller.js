import HttpException from '../exceptions/http-excepiton.js';
import AuthService from '../service/auth-service.js';

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const accessToken = await this.authService.login(email, password);
      res.cookie('access_token', accessToken, { httpOnly: true });
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({
          message: 'An error occurred while logging in',
        });
      }
    }
  }

  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await this.authService.createUser({
        username,
        email,
        password,
      });
      res.status(201).json({
        message: 'User registered successfully',
        user,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({
          message: 'An error occurred while registering user',
        });
      }
    }
  }
}
