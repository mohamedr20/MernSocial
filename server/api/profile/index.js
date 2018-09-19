'use strict'

const express = require('express');
const controller = require('./profile.controller');
const router = express.Router();
const passport = require('passport');

router.get('/all',controller.fetchAllProfiles);
router.get('/handle/:handle',controller.fetchProfileByHandle);
router.get('/',passport.authenticate('jwt',{session:false}),controller.fetchProfileById);

router.post('/',passport.authenticate('jwt',{session:false},controller.createProfile));
router.post('/experience',passport.authenticate('jwt',{session:false}),controller.createExperience);
router.post('/education',passport.authenticate('jwt',{session:false}),controller.createEducation);

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),controller.deleteExperience)
router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),controller.deleteEducation)
router.delete('/',passport.authenticate('jwt',{session:false}),controller.deleteProfile);


module.exports = router;