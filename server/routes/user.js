// const router = require('express').Router();

const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

router.route('/')
    .get(userController.getAllUsers);

module.exports = router;