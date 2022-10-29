// const router = require('express').Router();

const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;