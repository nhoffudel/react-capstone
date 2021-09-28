const express = require('express');
const { ObjectId } = require('bson');

/** Source code imports */
// Mongoose models
const Entry = require('../models/entry');

// create new express router 
const router = express.Router();

/**
   * @api {get} v1/entries List all entries 
   * @apiDescription Returns an array of all entries
   * @apiVersion 1.0.0
   * @apiName GetEntries
   * @apiGroup Entry
   * @apiPermission none
   *
   * @apiSuccess (200) {Object[]} entries List of entries
   * @apiSuccess (200) {String}   title       Title 
   * @apiSuccess (200) {String}   content      content
   * @apiSuccess (200) {String}   author      author
   * @apiSuccess (200) {Date}   date      date
   *
   * @apiError (Bad Request 400)   
   */
router.get('/', (req, res) => {
  Entry
    // Calling .find() on a model w/out any arguments gets all documents for that collection : )
    .find()     
    .then(allEntries => {
      const formattedEntries = allEntries.map(entry => ({ title: entry.title,
         content: entry.content,
          author: entry.author,
           date : entry.date,
            id: entry.id }));
      res.send(formattedEntries);
    })
    .catch(error => res.send(`Error on ${req.path} - ${error}`));
})

/**
   * @api {get} v1/entries/:title Get entry with author
   * @apiDescription Returns the entry with this author
   * @apiVersion 1.0.0
   * @apiName GetEntryTitle
   * @apiGroup Entry
   * @apiPermission none
   *
   * @apiSuccess (200) {Object} entries entry
   * @apiSuccess (200) {String}   title       Title 
   * @apiSuccess (200) {String}   content      content
   * @apiSuccess (200) {String}   author      author
   * @apiSuccess (200) {Date}   date      date
   *
   * @apiError (Bad Request 400)   
   */
router.get('/:author', (req, res) => {
  const author = req.params.author;
  const formatEntries = entries => entries.map(entry => ({ title: entry.title,
    content: entry.content,
     author: entry.author,
      date : entry.date,
       id: entry.id }));
  if(author) {
    Entry
      .find({ author: author })
      .then(desiredEntry => res.send(formatEntries(desiredEntry)))
      // Error handling
      .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
  }

  else {
    res.send(`404 entry not found'`)
  }
})

/**
   * @api {get} v1/entries/id/:id Get entry with id
   * @apiDescription Returns the entry with this id
   * @apiVersion 1.0.0
   * @apiName GetEntryID
   * @apiGroup Entry
   * @apiPermission none
   *
   * @apiSuccess (200) {Object} entries entry
   * @apiSuccess (200) {String}   title       Title 
   * @apiSuccess (200) {String}   content      content
   * @apiSuccess (200) {String}   author      author
   * @apiSuccess (200) {Date}   date      date
   *
   * @apiError (Bad Request 400)   
   */
router.get('/id/:id', (req, res) => {
  const id = new ObjectId(req.params.id);
  Entry.find({"_id": id})
    .then(desiredItems => {
      const formattedItems = desiredItems.map(entry => ({ title: entry.title,
        content: entry.content,
         author: entry.author,
          date : entry.date,
           id: entry.id }));
      console.log(formattedItems);
      res.send(formattedItems);
    })
    .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
})

// TODO: Add apidoc documentation
router.post('/', (req, res) => {
  const body = req.body;
  console.log(body);
  if (body.loggedIn){
  // create mongoose Entry model instance. we can then save this to mongodb as a document
  const newEntry = new Entry({ title: body.title, content: body.content, author: body.author, date: new Date() });
  
  // save to mongodb
  newEntry
    .save()
    .then(() => res.send(`${JSON.stringify(req.body)} Entry created!`))
    // Error handling
    .catch(error => res.send(`ERROR: Undable to create ${JSON.stringify(req.body)} entry. Err is ${JSON.stringify(error)}`));
  }
  else{
    console.log("error not logged in");
    res.send(`ERROR: not logged in`);
  }
});
    
router.put('/:id', async( req, res) => {
  Entry
    .updateOne({"_id": id}, {content: req.body.content})
    .then(() => res.send(`${id} content changed`))
    // Error handling
    .catch(error => res.send(`ERROR: Unable to change ${id} content. Err is ${JSON.stringify(error)}`));
}) 

router.delete('/:id', async( req, res) => {
  const id = ObjectId(req.params.id);
  Entry
    .findOneAndDelete({ "_id": id })
    .then(() => res.send(`${id} deleted`))
    .catch((err) => res.send(`Error - Unable to delete ${id}. ${err}`));
})

module.exports = router;