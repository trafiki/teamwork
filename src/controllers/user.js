import Helper from '../utils/Utils';
import pool from '../database/connection';
import { createUser, findIfUserExist } from '../database/queries/queries';

/**
* @class Users
*/
class Users {
  /**
  * Create User Account
  * Admin can create an employee user account.
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @return {object} JSON representing success message
  * @memberof Users
  */
  static async createUsers(req, res) {
    const {
      username, firstName, lastName, email, password, gender, jobRole, department, address,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const values = [username, firstName, lastName, email, hashedPassword, gender, jobRole,
      department, address];

    try {
      const { rows } = await pool.query(createUser, values);
      const { id } = rows[0];
      const token = Helper.generateToken({
        id,
        username,
        firstName,
        lastName,
        email,
      });
      return res.status(201).json({
        status: 'success',
        data: {
          username,
          message: 'User account successfully created',
          token,
          id,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // /**
  //  * Login a user
  //  *
  //  */
  // static async loginUsers(req, res) {
  // }
}

export default Users;
