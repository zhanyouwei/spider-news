/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/3/23.
 */

var superAgent = require('superagent');
var cheerio = require('cheerio');
var _ = require('underscore');

var dbUtils = require('./db');

superAgent
  .get('https://segmentfault.com/t/node.js/blogs')
  .end(function (err, res) {
    var $ = cheerio.load(res.text);
    var streamList = $('.stream-list__item');
    //_.each(streamList, function (item) {
    //	console.log($(item).find('.blog-rank .plus'));
    //});
    $('.stream-list__item .blog-rank .plus')
      .map(function (i, el) {
        // this === el
        var zan = $(this).text();
        var title = $(this).parent('.blog-rank').next().find('.title').text().trim();
        var data = {
          url: 'https://segmentfault.com' + $(this).parent('.blog-rank').next().find('.title a').attr('href'),
          title: title
        };
        dbUtils.insert(data, function (error) {
          if (error) {
            throw error;
          }
        });
      });
  });


//superAgent
//	.get('https://segmentfault.com/t/javascript/blogs')
//	.end(function (err, res) {
//		var $ = cheerio.load(res.text);
//		var streamList = $('.stream-list__item');
//		//_.each(streamList, function (item) {
//		//	console.log($(item).find('.blog-rank .plus'));
//		//});
//		$('.stream-list__item .blog-rank .plus')
//			.map(function (i, el) {
//				// this === el
//				var data = {
//					address: 'https://segmentfault.com' + $(this).attr('href'),
//					title: $(this).text()
//				};
//				dbUtils.insert(data, function (error) {
//					if(error) {
//						throw error;
//					}
//				});
//			});
//	});



