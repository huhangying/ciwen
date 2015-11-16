/**
 * Created by hhu on 2015/11/13.
 */

var db = require('./db');
var moment = require('moment');


module.exports = {
  // 获取用户信息
  getOne: function(req, res, next){
    var queryString = '';
    if (req.params.cell != ''){
      queryString = 'select * from user where cell=\'' + req.params.cell + '\'';
      db.getCommand(res, queryString);
    }
    else{
      //
      res.send('error');
    }
  },

  checkId: function(req, res){
    var queryString = '';
    if (req.params.id > 0){
      queryString = 'select * from user where id=' + req.params.id;
      //判断用户手机号是否被注册
      db.queryCommand(res, queryString);
    }
  },

  //创建用户
  createOne: function(req, res, next){

    // 获取user数据（json）
    var user = req.body;
    if (!user) return res.sendStatus(400);

    //验证手机号码
    if (user.cell == ''){
      res.send('error');
    }

    var queryString = 'select * from user where cell=\'' + user.cell + '\'';
    console.log(queryString);

    //判断用户手机号是否被注册
    db.queryCommandWithoutSending(queryString)
      // 成功
      .then( function successHandler(row_number){
          console.log(row_number);
          if (row_number < 1){ // 如果没有被注册，则创建一个新的
            queryString = 'insert into user set cell=\''+ user.cell + '\', user_name=\'' + user.name
            + '\',password=\'' + user.password + '\',register_date=\'' + moment().format() + '\', locked_count=0, apply=1';
            console.log(queryString);
            db.queryCommand(res, queryString);
          }
          else
          {
            //已经注册或错误参数
            //res.send('existed');
            res.send('{"return": "existed"}');
          }
        },
        // 失败
       function errorHandler(error){
          //console.log("The request failed: " + error);
          res.send('error')
        });

  },

  // 更新用户信息
  updateOne: function(req, res, next){
    var queryString = '';
    if (this.checkId(req, res)){
      queryString = 'update user set cell='+ req.params.id +',user_name=' + req.params.user_name
        + ',password=' + req.params.password + ',register_date=' + moment().format() + ', locked_count=0, apply=1 where id=' + req.params.id;
      db.queryCommand(res, queryString);
    }
    else{
      //找不到用户或参数错误
      res.send('');
    }
  }
}


