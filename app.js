/**
 * @author: Jason.友伟 zhanyouwei@meitunmama.com
 * Created on 16/3/23.
 */

var superAgent = require('superagent');
var cheerio = require('cheerio');
superAgent
	.get('https://segmentfault.com/t/node.js/blogs')
	.end(function (err, res) {
		var $ = cheerio.load(res.text);
		$('.stream-list__item .blog-rank .plus')
			.map(function (i, el) {
				// this === el
				console.log($(this).text().toString());
				return $(this).text();
			}).get().join(' ');
	});

