var express = require('express');
var ctrl = express.Router();
var Entry = require('../models/journal_table');
var JournalEntry = require('../models/journal_table');
var User = require('../models/user_table')


/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Memorease' });
});



ctrl.post('/entry', createEntry);

ctrl.get('/create', create);
ctrl.get('/id/:id', findById);
ctrl.get('/all', findAll);
ctrl.get('/entry', renderEntry);


function renderEntry(req, res, next){
  res.render('entry', {});
};


function create(req, res, next) {
  var entry = { comments: 'This is where I write in my journal entry on my wonderful life' };
  var model = new JournalEntry(entry).save().then(function(result) {
    res.json(result);
  });
};

function createEntry(req, res, next) {

  console.log(User, ' this is User function')

  JournalEntry.where({id: 1}).fetch({withRelated: ['user']}).then(function(user){
    console.log(user.related('user_id'))
    console.log(user, ' this is user in createEntry')
  })


  // console.log(req.session, ' this is req.session is createEntry')
  var entry = new Entry({
    comments: req.body.comments,
     // comments: req.session.comments,
    user_id: req.session.user_id
  }).save().then(function(result) {
    //1st db call ends,
    //2nd db call starts
    // console.log(result)
    Entry.collection().fetch().then(function(list) {
      var viewModel = {
        result: result.attributes,
        collection: []
      }
      list.forEach(function(model) {
        // console.log(model.attributes['user_id'] + " " + 'this is user');
        // console.log(result.attributes['id'] + " " + "this is the attributes id");
        if (model.attributes['user_id'] == req.session.user_id) {
          viewModel.collection.unshift(model.attributes['comments']);
        }
      })
      //console.log(viewModel);
      // console.log('-------')
      // console.log(viewModel);
      res.render('entry', viewModel); //{{comments}}
    });
  });

};

function findById(req, res, next) {
    var id = req.params.id; // typically going to be our ID
    var model = JournalEntry.where({
      id: id
    }).fetch().then(function(result) {
      res.json(result);
    });
  console.log(model);
};

function findAll(req, res, next) {
  JournalEntry.collection().fetch().then(function(results) {
    res.json(results);
  });
};

module.exports = ctrl;