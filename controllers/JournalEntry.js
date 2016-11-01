var express = require('express');
var ctrl = express.Router();
var JournalEntry = require('../models/journal_table');
var User = require('../models/user_table')

ctrl.get('/randomroute', function(req, res, next){

  User.where({id: 1}).fetch({withRelated: ['journals']})
  .then(function(user){
    console.log(user)
    res.json(user.related('journals'))
  })
});

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
  JournalEntry.where({id: 1}).fetch({withRelated: ['user']}).then(function(user){
  })
  var entry = new JournalEntry({
    comments: req.body.comments,
    user_id: req.session.user_id
  }).save().then(function(result) {
    JournalEntry.collection().fetch().then(function(list) {
      var viewModel = {
        result: result.attributes,
        collection: []
      }
      list.forEach(function(model) {
        if (model.attributes['user_id'] == req.session.user_id) {
          viewModel.collection.unshift(model.attributes['comments']);
        }
      })
      res.render('entry', viewModel); 
    });
  });
};

function findById(req, res, next) {
    var id = req.params.id; 
    var model = JournalEntry.where({
      id: id
    }).fetch().then(function(result) {
      res.json(result);
    });
};

function findAll(req, res, next) {
  JournalEntry.collection().fetch().then(function(results) {
    res.json(results);
  });
};

module.exports = ctrl;