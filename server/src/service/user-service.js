import UserRepository from '../repositories/userRepository.js';
import HttpException from '../exceptions/http-exception.js';

class UserService {
    // Create a new user
    async createUser(userData) {
        try {
            // User repository'den kullanıcı oluşturulmasını istiyoruz
            const newUser = await UserRepository.createUser(userData);
            return newUser;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; // Eğer bu HttpException ise, doğrudan atılacak
            }

            // Genel bir hata durumu
            console.error('Error in userService while creating user:', error);
            throw new HttpException(500, 'An error occurred while creating user');
        }
    }

    // Get a user by ID
    async getUserById(userId) {
        try {
            const user = await UserRepository.getUserById(userId);
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; // Eğer bu HttpException ise, doğrudan atılacak
            }

            console.error('Error in userService while fetching user by ID:', error);
            throw new HttpException(500, 'An error occurred while fetching user');
        }
    }

    // Get all users
    async getAllUsers() {
        try {
            const users = await UserRepository.getAllUsers();
            return users;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error; // Eğer bu HttpException ise, doğrudan atılacak
            }

            console.error('Error in userService while fetching all users:', error);
            throw new HttpException(500, 'An error occurred while fetching all users');
        }
    }
}

export default UserService;
