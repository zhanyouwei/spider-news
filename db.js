/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/3/23.
 */

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/test-database');
// 链接错误
db.on('error', function (error) {
  console.log(error);
});

// Schema 结构
var newsSchema = new mongoose.Schema({
  url: {type: String, default: '#'},
  title: {type: String},
  zan: {type: String},
  time: {type: Date, default: Date.now}
});

// model
var mongooseModel = db.model('mongoose', newsSchema);


function insert(data, callback) {
  mongooseModel.create(data, function (error) {
    if (error) {
      callback(error);
    } else {
      callback(null);
    }
  });
}

function find(callback) {
  // mongoose find
  var criteria = {}; // 查询条件
  var fields = {}; // 待返回的字段
  var options = {};
  mongooseModel.find(criteria, fields, options, function (error, result) {
    if (error) {
      console.log(error);
      throw Error(error);
    }
    if (callback) {
      callback(result);
    }
    //关闭数据库链接
    db.close();
  });
}

exports.insert = insert;
exports.find = find;
