'user strict'

const { getRepositoriesByUserController } = require('./../controllers')

const express = require('express');

const router = express.Router();

router.get('/', getRepositoriesByUserController);

module.exports = router;