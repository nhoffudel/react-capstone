const express = require('express');

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
   * @apiSuccess (200) {String}   email       Email address 
   * @apiSuccess (200) {String}   password      password
   *
   * @apiError (Bad Request 400)   
   */
router.get('/', (req, res) => {
  User
    // Calling .find() on a model w/out any arguments gets all documents for that collection : )
    .find()     
    .then(allUsers => {
      const formattedUsers = allUsers.map(user => ({ email: user.email, password: user.password, id: user.id }));
      res.send(formattedUsers);
    })
    .catch(error => res.send(`Error on ${req.path} - ${error}`));
})

/***
 * NOTE: If desired you could use async/await instead of promises, which would look like this:
 * See https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
 * and https://blog.risingstack.com/mastering-async-await-in-nodejs/
  ```
      app.get('/users', async (req, res) => {
        const users = await User.find();
        const formattedUsers = users.map(user => ({ name: user.name, type: user.type }));
        res.send(formattedUsers);
      })
  ```
 */

/**
   * @api {get} v1/users/:email Get user with email
   * @apiDescription Returns the user with this email
   * @apiVersion 1.0.0
   * @apiName GetUserEmail
   * @apiGroup User
   * @apiPermission none
   *
   * @apiSuccess (200) {Object} users user
   * @apiSuccess (200) {String}   email       Email address 
   * @apiSuccess (200) {String}   password      password
   *
   * @apiError (Bad Request 400)   
   */
router.get('/:email', (req, res) => {
  const email = req.params.email;
  const formatUsers = users => users.map(user => ({ email: user.email, password: user.pass, id: user.id }));
  if(email) {
    User
      .find({ email: email })
      .then(desiredUser => res.send(formatUsers(desiredUser)))
      // Error handling
      .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
  }

  else {
    res.send(`404 user not found'`)
  }
})

/**
   * @api {get} v1/users/:id Get user with id
   * @apiDescription Returns the user with this id
   * @apiVersion 1.0.0
   * @apiName GetUserID
   * @apiGroup User
   * @apiPermission none
   *
   * @apiSuccess (200) {Object} users user
   * @apiSuccess (200) {String}   email       Email address 
   * @apiSuccess (200) {String}   password      password
   *
   * @apiError (Bad Request 400)   
   */
 router.get('/:id', (req, res) => {
  const id = req.params.id;
  const formatUsers = users => users.map(user => ({ email: user.email, password: user.pass, id: user.id }));
  if(id) {
    User
      .find({ id: id })
      .then(desiredUser => res.send(formatUsers(desiredUser)))
      // Error handling
      .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
  }

  else {
    res.send(`404 user not found'`)
  }
})

// TODO: Add apidoc documentation
router.post('/', (req, res) => {
  const body = req.body;

  // create mongoose User model instance. we can then save this to mongodb as a document
  const newUser = new User({ email: body.email, password: body.password });
  
  // save to mongodb
  newUser
    .save()
    .then(() => res.send(`${JSON.stringify(req.body)} User created!`))
    // Error handling
    .catch(error => res.send(`ERROR: Undable to create ${JSON.stringify(req.body)} user. Err is ${JSON.stringify(error)}`));
})

/***
  // TODO: This is not working yet.
  app.delete('/users/:type/:name', async( req, res) => {
    const type = req.params.type;
    // helper function
  const formatUsers = users => users.map(user => ({ name: user.name, type: user.type }));

    if(type && type === 'fruit' || type === 'vegetable') {
      const desiredUsers = await User.find({ type: type })
      res.send(formatUsers(desiredUsers));
    }

    res.send(`Invalid route - ${req.path}. Valid routes are 'fruit', 'vegetable'`)

    // TODO .find() is probably a promise, use .catch() to do err handling if we can't find the name
    const userToDelete = await User.find({name: req.params.name});

    userToDelete
      .delete()
      .then(() => res.send(`${req.params.name} deleted`))
      .catch((err) => res.send(`Error - Unable to delete ${req.params.name}. ${err}`));

  });
**/

module.exports = router;