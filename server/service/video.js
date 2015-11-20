/**
 * Created by hhu on 2015/11/13.
 */

var db = require('./db');
var moment = require('moment');

module.exports = {

  //查看所有的分类列表
  getCatList: function(req, res, next){
    var queryString = 'select * from cat where apply=1';
    db.findCommand(res, queryString);
  },

  // 获取一个分类
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
      res.send('{"return":"error"}');
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
  },


  // 视频

  //查看所有的视频列表
  getVideoList: function(req, res, next){
    var queryString = 'select * from video where apply=1';
    db.findCommand(res, queryString);
  },

  // 根据CatId查看视频列表
  getVideosByCatId: function(req, res, next){
    var queryString = '';
    if (req.params.id > 0){
      queryString = 'select * from video where apply=1 and cat_id=' + req.params.id;
    }
    else {
      queryString = 'select * from video where apply=1';
    }
    db.findCommand(res, queryString);
  },

  // 查看单个视频
  getVideoById: function(req, res, next){
    var queryString = '';
    if(req.params.id > 0){
      queryString = 'select * from video where apply=1 and id=' + req.params.id;
    }
    else {
      res.send('{"return":"empty"}');
      return;
    }
    db.getCommand(res, queryString);
  },

  createVideo: function(req, res, next){

    // 获取user数据（json）
    var video = req.body;
    if (!video) return res.sendStatus(400);

    //验证分类ID
    if (video.cat_id < 1){
      res.send('{"return": "paramError"}');
    }

    //
    var queryString = '';
    queryString = 'insert into video (cat_id, name, content, author, screenshot, url, dl_url, updated, vote, sort, apply) ' +
      'VALUES ('+ video.cat_id + ',\'' + video.name + '\',\'' + video.content + '\',\'' + video.author + '\',\'' + video.screenshot + '\',\''
      + video.url + '\',\'' +  video.dl_url +'\',\'' +  moment().format() + '\',' +  video.vote + ',' + video.sort + ',1)';
     console.log(queryString);

     db.queryCommand(res, queryString);
  },

  updateVideo: function(req, res, next){
    console.log('update video');

    // 获取user数据（json）
    var video = req.body;
    if (!video) return res.sendStatus(400);

    //验证分类ID
    if (video.cat_id < 1){
      res.send('{"return": "paramError"}');
    }

    //
    var queryString = '';
    queryString = 'update video set name=\''+ video.name + '\',content=\'' + video.content + '\',author=\'' + video.author
      + '\',screenshot=\'' + video.screenshot + '\',url=\'' + video.url +'\',dl_url=\'' + video.dl_url + '\',updated=\''
      +  moment().format() + '\',vote=' + video.vote + ' where id=' + video.id ;
    //console.log(queryString);

    db.queryCommand(res, queryString);
  },

  deleteVideo: function(req, res, next){
    var queryString = '';
    if (req.params.id > 0){
      queryString = 'delete from video where id=' + req.params.id;
      console.log(queryString);
    }
    else {
      res.send('{"return": "paramError"}');
      return;
    }
    db.queryCommand(res, queryString);
  },

  // 为某个视频投一票
  increaseVote: function(req, res, next){
    var queryString = '';
    if(req.params.id > 0){
      queryString = 'update video set vote=vote+1 where id=' + req.params.id;
    }
    else {
      res.send('{"return":"error"}');
      return;
    }
    db.queryCommand(res, queryString);
  },
}


