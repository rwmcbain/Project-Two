var express = require('express');
var ctrl = express.Router();
var UserTable = require('../models/user_table');
var Account = require('../models/user_table');
var bcrypt = require('bcryptjs');
var Entry = require('../models/journal_table');




ctrl.post('/register', attemptToRegister);
ctrl.post('/login', attemptToLogin);
/* GET home page. */

ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Memorease' });
});

ctrl.get('/create', create); //delete

ctrl.get('/form', renderForm);
ctrl.get('/id/:id', findById);
ctrl.get('/all', findAll);
ctrl.get('/entry', renderEntry);

function renderEntry(req, res, next){
  res.render('entry', {});
};

/* form submission */
ctrl.post('/journalentry', function(req, res, next) {
  // <form action="/whereToGo" method="post" autocomplete="on"> 
  //form values
  //<input name="email"> -- 'name' attr binds to req.body
  //is sent as req.body.email

});


// ctrl.post('/register', attemptToRegister);
// ctrl.post('/login', attemptToLogin);

/* create row w/bookshelf */

//delete this 
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
  console.log(req.body)
  var password = req.body.passwordsignup;
  var hashedPassword = createPasswordHash(password);
  var account = new Account({
    email: req.body.emailsignup,
    password_hash: hashedPassword,
    first_name: req.body.firstnamesignup,
    last_name: req.body.lastnamesignup
  }).save().then(function(result) {
    //res.render
    console.log(result)
    //res.json(result);
    //res.render()
    res.redirect('/entry');

    //req.session
  });

};

// function createEntry(req, res, next) {
//   var hashedPassword = createPasswordHash(password);
//   var entry = new Entry({
//     comments: req.body.comments,
//   }).save().then(function(result) {
//     //res.render
//     console.log(result)
//     //res.json(result);
//     //res.render()
//     // res.redirect('/entry');

//     //req.session
//   });

// };

function createPasswordHash (password) {
  var salt = 10; // salt factor of 10
  console.log(password);
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
      if (attempt) {
          res.redirect('/entry');

      } else {
        res.json('Login in failed');
      }
      // then we share the results
      // res.redirect('/entry');
      // res.json({'is_logged_in': attempt });
    }
  )
};

module.exports = ctrl;