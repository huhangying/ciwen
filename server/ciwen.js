/**
 * 提供同数据库交互的APIs：
 *    - 用户注册
 *    - 视频内容管理
 *    - 投票和评论
 * Created by hhu on 2015/11/13
 */

var express = require('express');
var http = require('http');
var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

var bodyParser = require('body-parser');
//通常 POST 内容的格式是 application/x-www-form-urlencoded, 因此要用下面的方式来使用
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// parse application/json
var jsonParser = bodyParser.json()


var Users = require('./service/user');
var Videos = require('./service/video');

// 设置URL路由
var router = express.Router();

// REST API
router.route('/user')
  .post(urlencodedParser,Users.createOne)
  .put(Users.updateOne);
router.route('/user/:cell')
  .get(Users.getOne);
router.route('/cat')
  .get(Videos.getCatList)
  .post(Videos.createCatOne)
  .put(Videos.updateCatOne);
router.route('/cat/:id')
  .get(Videos.getVideosByCatId);
router.route('/video/update').put(urlencodedParser, Videos.updateVideo);
router.route('/video').get(Videos.getVideoList);
router.route('/video/add').post(Videos.createVideo);
router.route('/video/:id').get(Videos.getVideoById);


app.use('/', router);


// 启动服务器
http.createServer(app).listen(3300,function(){
  console.log("CIWEN server is started. listening port: 3300...")
});
