const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Source code imports */
// Mongoose models
const User = require('.././models/user');

// create new express router
const router = express.Router();

router.post('/login', (req, res) => {
  const body = req.body;
  User.findOne({ username: body.username }, function(err, user){
    if (err) throw err;
    const passwordCorrect = bcrypt.compareSync(body.password, user.password)
    if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  // const token = jwt.sign(userForToken, process.env.SECRET);
  const token = jwt.sign(userForToken, 'secret');

  res
    .status(200)
    .send({ token, userForToken });
  });
})

module.exports = router;