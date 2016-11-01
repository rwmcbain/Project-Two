var express = require('express');
var ctrl = express.Router();
var UserTable = require('../models/user_table');
var bcrypt = require('bcryptjs');

ctrl.post('/register', attemptToRegister);
ctrl.post('/login', attemptToLogin);

ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Memorease' });
});

ctrl.get('/form', renderForm);
ctrl.get('/id/:id', findById);
ctrl.get('/all', findAll);
ctrl.get('/entry', renderEntry);

function renderEntry(req, res, next){
  res.render('entry', {})
  console.log(req.session.email)
};

ctrl.post('/entry', function(req, res, next) {

});

function renderForm(req, res, next){
  res.render('form', {});
};

function findById(req, res, next) {
    var id = req.params.id; 
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

function attemptToRegister(req, res, next) {
  console.log(req.body)
  var password = req.body.passwordsignup;
  var hashedPassword = createPasswordHash(password);
  var account = new UserTable({
    email: req.body.emailsignup,
    password_hash: hashedPassword,
    first_name: req.body.firstnamesignup,
    last_name: req.body.lastnamesignup
  }).save().then(function(result) {
    req.session.user_id = result.attributes.id;
    res.redirect('/entry');

  });
};

function createPasswordHash (password) {
  var salt = 10; 
  console.log(password);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};
function comparePasswordHashes (input, db) {
  var hash = createPasswordHash(input);
  return bcrypt.compareSync(input, db);
};

function attemptToLogin(req, res, next) {
  var password = req.body.password;
  UserTable.where('email', req.body.email).fetch().then(
    function(result) {
      if(result === null){
        res.redirect('/');
      }
      else {
            req.session.user_id = result.attributes.id;

      var attempt = comparePasswordHashes(req.body.password, result.attributes.password_hash);

      if (attempt) {
          res.redirect('/entry');
      } else {
        res.json('Login in failed');
      }
    }
  }
  )
};

module.exports = ctrl;