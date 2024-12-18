import db from '../config/database.js';

export default class UserRepository {
  async findUserByEmail(email) {
    const result = await db.query(
      `
      SELECT * FROM users
      WHERE email = $1'
      `,
      [email],
    );
    return result.rows[0];
  }

  async getUserById(userId) {
    const res = await db.query(
      `
      SELECT * FROM users 
      WHERE id = $1
      `,
      [userId],
    );
    return res.rows[0];
  }

  async createUser(userData) {
    const { username, email, password } = userData;
    const res = await client.query(
      `
      INSERT INTO users(username, email, password) 
      VALUES($1, $2, $3) RETURNING *
      `,
      [username, email, password],
    );
    return res.rows[0];
  }

  async updateUser(userId, userData) {
    const { username, email, password } = userData;
    const res = await client.query(
      `
      UPDATE users SET username = $1, email = $2, password = $3 
      WHERE id = $4 RETURNING *
    `,
      [username, email, password, userId],
    );
    return res.rows[0];
  }
}
