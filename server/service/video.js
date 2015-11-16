/**
 * Created by hhu on 2015/11/13.
 */

var db = require('./db');

module.exports = {
  // 获取用户信息
  getCatOne: function(req, res, next){
    var queryString = '';
    if (req.params.id > 0){
      queryString = 'select * from cat where id=' + req.params.id;
    }
    else{
      queryString = 'select * from cat limit 1';
    }
    db.queryCommand(res, queryString);
  },
  //创建分类
  createCatOne: function(req, res, next){
    var queryString = '';
    if (req.params.name != ''){
      queryString = 'insert into cat set name=\''+ req.params.name +'\',desc=\'' + req.params.desc
        +'\',password=\'' + req.params.password + '\',register_date=' + date() + ',from=\'\', apply=1';
      db.queryCommand(res, queryString);
    }
    else{
      //错误参数
      res.send('');
    }
  },

  // 更新分类
  updateCatOne: function(req, res, next){
    var queryString = '';
    if (this.checkId(req, res)){
      queryString = 'update cat set name='+ req.params.name +',desc=' + req.params.desc
        + ',order=' + req.params.order + ',from=\'\',apply=1 where id=' + req.params.id;
      db.queryCommand(res, queryString);
    }
    else{
      //找不到用户或参数错误
      res.send('');
    }
  }
}


