import UserRepository from '../repositories/userRepository.js';
import HttpException from '../exceptions/http-exception.js';

class UserService {
  async createUser(userData) {
    try {
      const newUser = await UserRepository.createUser(userData);
      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'An error occurred while creating user');
    }
  }

  async getUserById(userId) {
    try {
      const user = await UserRepository.getUserById(userId);
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'An error occurred while fetching user');
    }
  }

  async getAllUsers() {
    try {
      const users = await UserRepository.getAllUsers();
      return users;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        500,
        'An error occurred while fetching all users',
      );
    }
  }
}

export default UserService;
