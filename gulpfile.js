'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var db = require('./models/db');

var watch = require('gulp-watch')
var sass = require('gulp-sass')
// then install all three ^ npm install gulp gulp-watch gulp-sass --save


gulp.task('compile-sass', function(){
  gulp.src('./public/stylesheets/style.scss')
  .pipe(sass())
  .pipe(gulp.dest('./public/stylesheets/'))
});

gulp.task('watch', function(){
  gulp.watch(['./public/stylesheets/style.scss'],['compile-sass']);
})

gulp.task('default', ['compile-sass', 'watch'])


gulp.task('db_create_user_table', function() {
  var sqlString = "create table user_accounts (" +
  "id int not null auto_increment, " +
  "first_name varchar(20) not null, " +
  "last_name varchar(30) not null, " +
  "email varchar(255) not null, " +
  "password_hash varchar(61) not null, " +
  "primary key (id) " +
   ");";
     function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});
  
gulp.task('db_create_journal_table', function() {
  var sqlString = "create table journal_entry (" +
  "id int not null auto_increment, " +
  // "timestamp DATETIME, " +
  "comments text not null, " +
  "user_id int references user_accounts(id), " +
  "primary key (id) " +
  ");";
    function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});

// gulp.task('db_create_cats', function() {
//   var sqlString = "create table cats (" +
//   "id int not null auto_increment, " +
//   "name varchar(255) not null, " +
//   "comments text not null, " +
//   "primary key (id) " +
//   ");";
//     function cb(res) {
//     console.log(res);
//   }
//   db.raw(sqlString).then(cb);
// });


gulp.task('db_drop_user_accounts', function() {
  var sqlString = "drop table user_accounts;";
  function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});

gulp.task('db_drop_journal_table', function() {
  var sqlString = "drop table journal_entry;";
  function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});

// gulp.task('db_drop_cats', function() {
//   var sqlString = "drop table cats;";
//   function cb(res) {
//     console.log(res);
//   }
//   db.raw(sqlString).then(cb);
// });



gulp.task('Nodemon', restartServer);

function restartServer() {
  nodemon({
    script: './bin/www',
    ext: 'js hbs scss sql'
  });
};

gulp.task('default', ['Nodemon']);