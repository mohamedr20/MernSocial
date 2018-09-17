'use strict'

const express = require('express');
const controller = require('./post.controller');
const router = express.Router();

router.get('/',controller.fetch);
// router.get('/:id',controller.show);
router.post('/',controller.create);
// router.put('/:id',controller.update);
// router.delete('/:id',controller.delete);

module.exports = router;