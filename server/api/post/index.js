'use strict'

const express = require('express');
const controller = require('./post.controller');
const router = express.Router();
const passport = require('passport');

router.get('/:id',controller.findPostById);
router.post('/',passport.authenticate('jwt',{session:false}),controller.createPost);
router.delete('/:id',passport.authenticate('jwt',{session:false}),controller.deletePost)
router.post('/like/:id',passport.authenticate('jwt',{session:false}),controller.likePost)
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),controller.unLikePost)
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),controller.createComment)
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),controller.deleteComment)

module.exports = router;