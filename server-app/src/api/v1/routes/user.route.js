const express = require('express');
const bcrypt = require('bcrypt');
const { ObjectId } = require('bson');

/** Source code imports */
// Mongoose models
const User = require('.././models/user');

// create new express router
const router = express.Router();

/**
   * @api {get} v1/users List all users 
   * @apiDescription Returns an array of all users
   * @apiVersion 1.0.0
   * @apiName GetUsers
   * @apiGroup User
   * @apiPermission none
   *
   * @apiSuccess (200) {Object[]} users List of users
   * @apiSuccess (200) {String}   username       Username 
   * @apiSuccess (200) {String}   password      password
   *
   * @apiError (Bad Request 400)   
   */
router.get('/', (req, res) => {
  User
    // Calling .find() on a model w/out any arguments gets all documents for that collection : )
    .find()     
    .then(allUsers => {
      const formattedUsers = allUsers.map(user => ({ username: user.username, password: user.password, id: user.id }));
      res.send(formattedUsers);
    })
    .catch(error => res.send(`Error on ${req.path} - ${error}`));
})

/**
   * @api {get} v1/users/username/:username Get user with username
   * @apiDescription Returns the user with this username
   * @apiVersion 1.0.0
   * @apiName GetUserUsername
   * @apiGroup User
   * @apiPermission none
   *
   * @apiSuccess (200) {Object} users user
   * @apiSuccess (200) {String}   username       Username 
   * @apiSuccess (200) {String}   password      password
   *
   * @apiError (Bad Request 400)   
   */
router.get('/username/:username', (req, res) => {
  const username = req.params.username;
  const formatUsers = users => users.map(user => ({ username: user.username, password: user.password, id: user._id }));
  if(username) {
    User
      .find({ username: username })
      .then(desiredUser => res.send(formatUsers(desiredUser)))
      // Error handling
      .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
  }

  else {
    res.send(`404 user not found'`)
  }
})

/**
   * @api {get} v1/users/id/:id Get user with id
   * @apiDescription Returns the user with this id
   * @apiVersion 1.0.0
   * @apiName GetUserID
   * @apiGroup User
   * @apiPermission none
   *
   * @apiSuccess (200) {Object} users user
   * @apiSuccess (200) {String}   username       Username 
   * @apiSuccess (200) {String}   password      password
   *
   * @apiError (Bad Request 400)   
   */
router.get('/id/:id', (req, res) => {
  const id = new ObjectId(req.params.id);
  User.find({"_id": id})
    .then(desiredItems => {
      const formattedItems = desiredItems.map(user => ({username: user.username, password: user.password, id: user._id }));
      console.log(formattedItems);
      res.send(formattedItems);
    })
    .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
})

// TODO: Add apidoc documentation
router.post('/', (req, res) => {
  const body = req.body;
  const saltRounds = 10
  const passwordHash = bcrypt.hashSync(body.password, saltRounds)
  // create mongoose User model instance. we can then save this to mongodb as a document
  const newUser = new User({ username: body.username, password: passwordHash });
  
  // save to mongodb
  newUser
    .save()
    .then(() => res.send(`${JSON.stringify(req.body)} User created!`))
    // Error handling
    .catch(error => res.send(`ERROR: Undable to create ${JSON.stringify(req.body)} user. Err is ${JSON.stringify(error)}`));
})

router.put('/:id', async( req, res) => {
  const saltRounds = 10
  const passwordHash = bcrypt.hashSync(req.body.password, saltRounds)
  const id = ObjectId(req.params.id);
  User
    .updateOne({"_id": id}, {password: passwordHash})
    .then(() => res.send(`${id} content changed`))
    // Error handling
    .catch(error => res.send(`ERROR: Unable to change ${id} content. Err is ${JSON.stringify(error)}`));
}) 

router.delete('/:id', async( req, res) => {
  const id = ObjectId(req.params.id);
  User
    .findOneAndDelete({ "_id": id })
    .then(() => res.send(`${id} deleted`))
    .catch((err) => res.send(`Error - Unable to delete ${id}. ${err}`));
})

module.exports = router;