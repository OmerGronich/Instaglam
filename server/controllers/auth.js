const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { refreshTokenSecret } = require('../config');
const {
  verifyPassword,
  getUser,
  createUser
} = require('../services/user-services');
const getTokens = require('../services/auth-services');
const serverResponse = require('../utils/serverResponse');

// @route   POST '/api/login'
// @desc:   Authenticate users
// @access: Public
const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return serverResponse(res, 400, { message: errors.array() });

    const { email, password } = req.body || {};
    const user = await getUser(email);

    if (!(user && verifyPassword(user, password)))
      return serverResponse(res, 401, { message: 'Invalid credentials' });

    return serverResponse(res, 200, { payload: getTokens(user) });
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal server error when trying to login'
    });
  }
};

// @route   POST '/api/register'
// @desc:   Create users
// @access: Public
const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return serverResponse(res, 400, { message: errors.array() });

    const exists = await getUser(req.body.email);

    if (exists)
      return serverResponse(res, 400, { message: 'User already exists' });

    const user = await createUser(req.body);

    return serverResponse(res, 200, { payload: getTokens(user) });
  } catch (e) {
    return serverResponse(res, 500, {
      message: 'Internal error while trying to create user'
    });
  }
};

// @route   POST '/api/logout'
// @desc:   Remove authentication
// @access: Private
const logout = async (req, res) => {
  try {
    const user = await getUser(req.user.email);
    user.refreshTokenIdentifier = '';
    await user.save();

    return serverResponse(res, 200, { message: 'Succesfully logged out' });
  } catch (e) {
    return serverResponse(res, 500, {
      message: `internal error while trying to logout`
    });
  }
};

// @route   POST '/api/token/refresh'
// @desc:   Refresh token
// @access: Public
const refresh = async function (req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      let decoded;

      try {
        decoded = jwt.verify(token, refreshTokenSecret);
      } catch (e) {
        return serverResponse(res, 401, { message: 'Unauthorized' });
      }

      const { email, created } = decoded;

      const user = await getUser(email);

      if (created === user.refreshTokenIdentifier)
        return serverResponse(res, 200, { payload: getTokens(user) });
    }

    return serverResponse(res, 401, { message: 'Unauthorized' });
  } catch (e) {
    return serverResponse(res, 500, { message: 'Internal server error' });
  }
};

module.exports = {
  login,
  register,
  logout,
  refresh
};
