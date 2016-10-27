var express = require('express');
var ctrl = express.Router();
var JournalEntry = require('../models/journal_table');

/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Memorease' });
});

ctrl.get('/create', create);
ctrl.get('/form', renderForm);
ctrl.get('/id/:id', findById);
ctrl.get('/all', findAll);



function renderForm(req, res, next){
  res.render('form', {});
};


/* create row w/bookshelf */
function create(req, res, next) {
  //req.body contain whatever our form sends
  var entry = { comments: 'This is where I write in my journal entry on my wonderful life' };
  var model = new JournalEntry(entry).save().then(function(result) {
    res.json(result);
    //res.render('template', result.attributes);
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