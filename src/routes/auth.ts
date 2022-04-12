const express = require('express');
const router = new express.Router();
const {User} = require('../model');
const {registerValidation, loginValidation} = require(
    '../utility/validations/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../logger/logger');


router.post('/users/register', async (req, res) => {
  // VALIDATION
  const {error} = registerValidation(req.body,);
  if (error) {
    return res.send(error['details'][0]['message']);
  }

  // CHECKING IF EMAIL EXIST
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send({'error': 'Email already exist'});

  // SALTING PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();

    res.send({
      name: req.body.name,
      email: req.body.email,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});


// LOGIN
router.post('/users/login', async (req, res) => {
  // VALIDATION
  logger.warn('reached');
  const {error} = loginValidation(req.body);
  if (error) {
    return res.status(401).send(error['details'][0]['message']);
  }

  // CHECKING IF EMAIL EXIST
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).send({
      'error': 'Invalid email or password',
    });
  }

  // COMPARING PASSWORD
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(401).send({
      'error': 'Invalid email or password',
    });
  }

  // GENERATING TOKEN
  const token = jwt.sign({email: user.email}, process.env.TOKEN_SECREAT);
  res.header('Authorization', token).send({'data': token});
});
module.exports = router;
