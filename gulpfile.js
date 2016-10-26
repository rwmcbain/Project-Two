'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var db = require('./models/db');


gulp.task('db_create_user_table', function() {
  var sqlString = "create table user_accounts (" +
  "id int not null auto_increment, " +
  "email varchar(255) not null, " +
  "password_hash varchar(61) not null, " +
  "primary key (id) " +
   ");";
     function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});
  
gulp.task('db_create_news_feed', function() {
  var sqlString = "create table news_feed (" +
  "id int not null auto_increment, " +
  "timestamp DATETIME, " +
  "comments text not null, " +
  "primary key (id) " +
  ");";
    function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});

gulp.task('db_create_cats', function() {
  var sqlString = "create table cats (" +
  "id int not null auto_increment, " +
  "name varchar(255) not null, " +
  "comments text not null, " +
  "primary key (id) " +
  ");";
    function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});


gulp.task('db_drop_user_table', function() {
  var sqlString = "drop table user_accounts;";
  function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});

gulp.task('db_drop_news_feed', function() {
  var sqlString = "drop table news_feed;";
  function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});

gulp.task('db_drop_cats', function() {
  var sqlString = "drop table cats;";
  function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});



gulp.task('Nodemon', restartServer);

function restartServer() {
  nodemon({
    script: './bin/www',
    ext: 'js hbs scss sql'
  });
};

gulp.task('default', ['Nodemon']);