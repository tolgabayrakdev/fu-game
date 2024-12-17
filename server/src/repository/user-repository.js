import db from '../config/database.js';

class UserRepository {
  async getUserById(userId) {
    try {
      const res = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
      return res.rows[0]; 
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const { name, email, password } = userData;
      const res = await db.query(
        'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
        [name, email, password]
      );
      return res.rows[0]; 
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const res = await db.query('SELECT * FROM users');
      return res.rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}

export default UserRepository;
