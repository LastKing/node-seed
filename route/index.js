/**
 * Created by toonew on 2017/3/21.
 */
const express = require('express');
const router = express.Router();

const Redis = require('../util/redis');

router.get('/', function (req, res) {
  console.log(req.session.id);
  res.render('index', {title: 'hello world'});
});

let number = 1;
router.post('/', function (req, res) {
  if (req.body.flag == "true") {
    Redis.set('foo', 'bar' + number);
    number++;
  }

  Redis.get('foo', function (err, result) {
    res.send({key1: "test", key2: result});
  });
});

module.exports = router;
