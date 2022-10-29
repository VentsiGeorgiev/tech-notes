// const router = require('express').Router();

const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;