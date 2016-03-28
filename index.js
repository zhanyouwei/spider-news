/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/3/28.
 */
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var markdown = require("markdown").markdown;

var dbUtils = require('./db');

var port = '9100';

http.createServer(function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  response.setHeader("X-Powered-By", ' 3.2.1');
  if (request.url !== '/favicon.ico') {
    if (request.url === '/') {
      response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
      fs.readFile('./README.md', function (err, data) {
        //response.end('Hello! This is cors server.');
        var html = '<html>'
          + '<head>'
          + '<title>nodejs</title>'
          + '</head>'
          + '<body>'
          + markdown.toHTML(data.toString('utf8'))
          + '</body>'
          + '</html>';
        response.write(html);
        response.end();
      });
      return;
    }
    response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
    if (request.url === '/segmentfault') {
      dbUtils.find(function (result) {
        response.end(JSON.stringify(result));
      });
    }
  }
}).listen(port);


