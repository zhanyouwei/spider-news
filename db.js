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
	address: {type: String, default: '#'},
	title: {type: String},
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


exports.insert = insert;
