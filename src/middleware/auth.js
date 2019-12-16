import Helper from '../utils/Utils';
// import pool from '../database/connection';

/**
 * @class UserAuthentication
 * @description Authenticates a given user
 * @exports UserAuthentication
 */
class UserAuthentication {
  /**
    * verifyAuthHeader
    * @method verifyAuthHeader
    * @static
    * @param { object } req - The request object
    * @return { object } JSON represesnting success message
    * @memberof UserAuthentication
   */
  static verifyAuthHeader(req) {
    if (!req.headers.authorization) {
      return { error: 'auth' };
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = Helper.verifyToken(token);

    if (!payload) {
      return { error: 'token' };
    }
    console.log(payload, token);
    return payload;
  }

  /**
  * verifyUserToken
  * @method verifyUserToken
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @return {object} JSON representing success message
  * @param {object} next
  * @memberof UserAuthentication
  */
  static verifyUserToken(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
    } else if (payload && payload.error === 'token') {
      status = 401;
      error = 'The provided token can not be authenticated';
    }

    if (error) {
      return res.status(status).json({ status, error });
    }
    req.user = payload;
    next();
  }

  /**
   * Verify Admin
   * @method isAdmin
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @param {object} next
   * @memberof UserAuthentication
   */
  static isAdmin(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
    } else if (payload && payload.error === 'token') {
      status = 401;
      error = 'The provided token can not be authenticated';
    }
    if (error) {
      return res.status(status).json({ status, error });
    }

    if (payload.jobrole !== 'admin') {
      return res.status(403).json({
        status: 403,
        error: 'only admin can generate employee account',
      });
    }
    next();
  }
}

export default UserAuthentication;
