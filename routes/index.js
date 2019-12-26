var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_ex',
  debug: false
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/connect', function (req, res, next) {
  if (db != null) {
    res.send('connect db succes');
  } else{
    res.send('conncect filed');
  }
});

router.get('/select', function (req, res, next) {
 db.query('SELECT * FROM tb_book', function (err, rs) {
   res.render('select', {books: rs});
 })
});

router.get('/form', function (req, res, next) {
  res.render('form');
});

router.post('/form', function (req, res, next) {
  db.query('INSERT INTO tb_book SET ?',req.body, function (err, rs) {
    res.send('insert succes');
  });
 });

 router.get('/delete', function (req, res, next) {
  db.query('DELETE FROM tb_book WHERE id = ?',req.query.id, function (err, rs) {
    res.redirect('/select');
  });
 });

 router.get('/edit', function (req, res, next) {
  db.query('SELECT * FROM tb_book WHERE id = ?',req.query.id, function (err, rs) {
    res.render('form',{ book: rs[0] });
  })
 });

 router.post('/edit', function (req, res, next) {
   var param =[
     req.body,
     req.query.id
   ]
  db.query('UPDATE tb_book SET ? WHERE id = ?', param, function (err, rs) {
    res.redirect('/select');
  });
 });
module.exports = router;
