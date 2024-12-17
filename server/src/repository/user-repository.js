import db from '../config/database.js';
import HttpException from '../exceptions/http-exception.js';

class UserRepository {
  async getUserById(userId) {
    try {
      const res = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (res.rows.length === 0) {
        throw new HttpException(404, 'User not found');
      }
      return res.rows[0];
    } catch (error) {
      throw new HttpException(500, 'Internal server error');
    }
  }

  async createUser(userData) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      const { name, email, password } = userData;
      const res = await client.query(
        'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
        [name, email, password]
      );

      const newUser = res.rows[0];

      await client.query('COMMIT');
      return newUser;

    } catch (error) {
      await client.query('ROLLBACK');
      throw new HttpException(500, 'Internal server error');
    } finally {
      client.release();
    }
  }

  async getAllUsers() {
    try {
      const res = await db.query('SELECT * FROM users');
      return res.rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException(500, 'Internal server error');
    }
  }
}

export default new UserRepository();
