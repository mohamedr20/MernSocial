'use strict'

const express = require('express');
const controller = require('./user.controller');
const router = express.Router();
const passport = require('passport');

router.get('/',controller.fetch);
router.post('/register',controller.register);
router.post('/login',controller.login);
router.get('/current',passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      });
    })
// router.get('/:id',controller.show);
router.post('/',controller.create);
// router.put('/:id',controller.update);
// router.delete('/:id',controller.delete);

module.exports = router;