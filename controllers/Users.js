var express = require('express');
var ctrl = express.Router();
var UserTable = require('../models/user_table');

/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Memorease' });
});

ctrl.get('/create', create);
ctrl.get('/form', renderForm);
ctrl.get('/id/:id', findById);
ctrl.get('/all', findAll);

/* create row w/bookshelf */
function create(req, res, next) {
  //req.body contain whatever our form sends
  var entry = { email: 'russell.mcbain@gmail.com', first_name: 'Russell', 
  last_name: 'McBain', password_hash: 'p455w0rdz' };
  var model = new UserTable(entry).save().then(function(result) {
    res.json(result);
    //res.render('template', result.attributes);
  });
};
function renderForm(req, res, next){
  res.render('form', {});
};

function findById(req, res, next) {
    var id = req.params.id; // typically going to be our ID
    var model = UserTable.where({
      id: id
    }).fetch().then(function(result) {
      res.json(result);
    });
  console.log(model);
};

function findAll(req, res, next) {
  UserTable.collection().fetch().then(function(results) {
    res.json(results);
  });
};

module.exports = ctrl;