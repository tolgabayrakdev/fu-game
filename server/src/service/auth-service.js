import HttpException from '../exceptions/http-excepiton';
import TokenHelper from '../helper/token-helper';
import UserRepository from '../repository/user-repository';

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
                throw new HttpException(
                    500,
                    'An error occurred while logging in',
                );
            }
        }
    }
}
