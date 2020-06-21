const User = require('../models/User.js');
const { deleteFile } = require('./cloud-services');

// @desc: Create users
// @route: /api/users
function createUser(user) {
  user = new User(user);
  if (!user.bio) {
    user.bio = `Hello my name is ${user.fullName}`;
  }
  return user.save();
}

// @desc: Get users
// @route: /api/users/:email
function getUser(email) {
  return User.findOne({ email });
}

// @desc: Update users
// @route: /api/users/:email
async function editUser(email, newData) {
  const user = await User.findOne({ email });
  Object.assign(user, newData);
  return user.save();
}

// @desc: Remove users
// @route: /api/users/:email
async function deleteUser(email) {
  const user = await getUser(email);
  if (user.profilePic) {
    await deleteFile(user.profilePic);
  }
  return User.findOneAndRemove({ email });
}

function verifyPassword(user, password) {
  return user.verifyPassword(password);
}

module.exports = { createUser, getUser, deleteUser, editUser, verifyPassword };
