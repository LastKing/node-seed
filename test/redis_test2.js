/**
 * Created by Rain on 2017/3/22.
 */
var Redis = require('ioredis');
var redis = new Redis();
var pub = new Redis();

//1. 消费与订阅
function test1() {
  redis.subscribe('news', 'music', function (err, count) {
    pub.publish('news', 'Hello world!');
    pub.publish('music', 'Hello again!');
  });

  var number = 0;
  redis.on('message', function (channel, message) {
    number += 1;
    console.log('Receive message %s from channel %s', message, channel);
  });

  redis.on('messageBuffer', function (channel, message) {
    console.log(channel, message);
  });
}


function test2() {
  redis.set('test1', Buffer.from('bar'));
  console.log(Buffer.from('bar'));

  //如果直接用get，他会将get 转化成 为 string。。。我日
  redis.getBuffer('foo', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  })
}
test2();

function test3() {
  //监听
  redis.monitor(function (err, monitor) {
    monitor.on('monitor', function (time, args, source, database) {

      console.log(time, args, source, database);
    });
  });
  // setTimeout(function () {
  //   test1();
  // }, 1000);

}
// test3();














