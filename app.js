var express = require("express");
var app = express();
var router = express.Router();
var request = require('request');



router.all('*',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();

})
//电影api接口
const movie_url = {
  baseUrl: "https://douban.uieee.com/v2/movie/",
  start: 0,
  count: 10,
  city: '北京',
  q: '',
  tag: ''
}

//图书api接口
const book_url = {
  baseUrl: 'https://douban-api.uieee.com/v2/book/'
}


function getData (req, res, next) {
	  let paramsStr = req.query || {};
	  let str = '?';
	  if(paramsStr !== {}){
	    // console.log(paramsStr)
	    for(let key in paramsStr){
	      str += key + '='+ paramsStr[key] + '&'
	    }

	  }
	  str = str.substr(0,str.length-1);
	  console.log(str)
	  console.log(req.path)
	    // var url = 'https://douban-api.uieee.com/v2/movie/in_theaters?start=1&count=1';

	    request(movie_url.baseUrl + req.path + str, function (error, response, body) {
	        if (!error && response.statusCode === 200) {
	            var data = JSON.parse(body);
	            res.send(data);
	        } else {
            	res.send('{error:404}');
        }
    });
}
router.get('/in_theaters', getData);
router.get('/top250', getData);
router.get('/coming_soon',getData);
router.get('/subject/:id', getData);
app.use('/', router);

app.listen(3006,function(){
	console.log('Server is running on 3006 of port')

})
