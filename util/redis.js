/**
 * Created by Rain on 2017/3/22.
 */
var config = require('config');
var Redis = require('ioredis');

var client = new Redis({
  port: config.get('redis_port'),
  host: config.get('redis_host'),
  db: config.get('redis_db'),
  password: config.get('redis_password')
});

client.on('error', function (err) {
  if (err) {
    console.error('connect to redis error, check your redis config', err);
    process.exit(1);
  }
});

module.exports = client;