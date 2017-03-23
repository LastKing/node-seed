/**
 * Created by Rain on 2016/6/1.
 */
var qiniu = require("qiniu");
var config = require('config');

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
}

//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId);
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
    }
  });
}

qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

//要上传的空间
var bucket = config.qiniu.bucket;

/**
 * 上传的图片
 * @param filename  文件名
 * @param filePath  上传文件路径
 */
var upload = function (filename, filePath) {
  //生成上传 Token
  var token = uptoken(bucket, filename);

  //调用uploadFile上传
  uploadFile(token, filename, filePath);
};

module.exports = {
  upload: upload
};