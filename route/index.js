/**
 * Created by toonew on 2017/3/21.
 */
const express = require('express');
const router = express.Router();
const ioredis = require('ioredis');
const redis = new ioredis();

router.get('/', function (req, res) {
  console.log(req.session.id);
  res.render('index', {title: 'hello world'});
});

let number = 1;
router.post('/', function (req, res) {
  if (req.body.flag == "true") {
    redis.set('foo', 'bar' + number);
    number++;
  }

  redis.get('foo', function (err, result) {
    res.send({key1: "test", key2: result});
  });
});

module.exports = router;
