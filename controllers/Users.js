var express = require('express');
var ctrl = express.Router();
var UserTable = require('../models/user_table');
var Account = require('../models/user_table');
var bcrypt = require('bcryptjs');




ctrl.post('/register', attemptToRegister);
ctrl.post('/login', attemptToLogin);
/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Memorease' });
});

ctrl.get('/create', create);
ctrl.get('/form', renderForm);
ctrl.get('/id/:id', findById);
ctrl.get('/all', findAll);



// ctrl.post('/register', attemptToRegister);
// ctrl.post('/login', attemptToLogin);

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





function attemptToRegister(req, res, next) {
  // var password = 'lololol42';
  // console.log(req.body)
  // var hash = createPasswordHash(password);
  // console.log(hash);
  // first, we need an Account model
  // a user with a form would pass in req.body
  // { email: '', password_hash: ''}
  var password = req.body.password;
  var hashedPassword = createPasswordHash(password);
  var account = new Account({
    email: req.body.email,
    password_hash: hashedPassword
  }).save().then(function(result) {
    //res.render
    console.log(result)
    res.json(result);
  });

};

function createPasswordHash (password) {
  var salt = 10; // salt factor of 10
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};
function comparePasswordHashes (input, db) {
  //input: user's attempted to login
  var hash = createPasswordHash(input);
  return bcrypt.compareSync(input, db);
};

function attemptToLogin(req, res, next) {
  var password = req.body.password;
  // who is our user?
  Account.where('email', req.body.email).fetch().then(
    function(result) {
      // we now have our user: result
      // next, we need their password! (to compare it)
      // bcrypt.compareSync(password, hash); // returns true/false
      // console.log(result);
      // model attributes on results are sometimes stored on results.attributes
      var attempt = comparePasswordHashes(req.body.password, result.attributes.password_hash);
      // then we share the results
      res.json({'is_logged_in': attempt });
    }
  )
};

module.exports = ctrl;