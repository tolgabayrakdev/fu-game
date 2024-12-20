import HttpException from '../exceptions/http-exception.js';
import PasswordHelper from '../helper/password-helper.js';
import TokenHelper from '../helper/token-helper.js';
import UserRepository from '../repository/user-repository.js';

export default class AuthService {
  constructor() {
    this.tokenHelper = new TokenHelper();
    this.userRepository = new UserRepository();
  }
  async login(email, password) {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new HttpException(404, 'User not found');
      }
      const isPasswordValid = await this.tokenHelper.verifyPassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException(401, 'Invalid password');
      }
      const accessToken = await this.tokenHelper.generateToken(user);
      return accessToken;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, 'An error occurred while logging in');
      }
    }
  }

  async register(user) {
    try {
      const existingUser = await this.userRepository.findUserByEmail(
        user.email,
      );
      if (existingUser) {
        throw new HttpException(409, 'User already exists');
      }
      const newUser = {
        username: user.username,
        email: user.email,
        password: await PasswordHelper.hashPassword(user.password),
      };
      await this.userRepository.createUser(newUser);
      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          500,
          'An error occurred while registering user',
        );
      }
    }
  }

  async verifyUser(token) {
    try {
      const decodedToken = this.tokenHelper.verifyAccessToken(token);
      const user = await this.userRepository.findUserById(decodedToken.id);
      if (!user) {
        throw new HttpException(404, 'User not found');
      }
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(500, 'An error occurred while verifying user');
      }
    }
  }
}
