/**
 * Created by Rain on 2017/3/22.
 */
var assert = require('assert');

var Redis = require('ioredis');


describe('redis 广播和消费者模式 测试', function () {
  it('#测试1 ', function (done) {
    var redis = new Redis();
    var pub = new Redis();
    redis.subscribe('news', 'music', function (err, count) {
      pub.publish('news', 'Hello world!');
    });

    //监听消息
    redis.on('message', function (channel, message) {
      assert.equal("Hello world!", message);
      assert.equal("news", channel);

      console.log(`Receive message ${message} from channel ${channel}`);
      setTimeout(function () {
        done();
      }, 100)
    });
  });
  ;
});
