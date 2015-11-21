/**
 * Created by hhu on 2015/11/13.
 */
var mysql = require('mysql');
var connectionState = false;
function connectMySql(){
  global.conn = mysql.createConnection({
    //host: 'localhost',
    host: '182.92.230.67',
    port: 3306,
    user: 'root',
    password: 'as#$#23REE2e',
    database: 'ciwen'
  });
  conn.connect(function(err){
    if(err){
      console.log('SQL connect err:'+err);
      connectionState = false;
      conn.end();
    }
    else{
      console.log('SQL connect successful!');
      connectionState = true;
    }
  });
  conn.on('close', function (err) {
    console.log('mysqldb conn close');
    connectionState = false;
    conn.end();
  });
  conn.on('error', function (err) {
    console.log('mysqldb error: ' + err);
    connectionState = false;
    conn.end();
  });
}
connectMySql();
var dbConnChecker = setInterval(function(){
  if(!connectionState){
    // 重连
    connectMySql();
  }
},2000);


var Q = require('q');

module.exports = {

  //findCommand：返回查询列表
  findCommand: function (res, cmd) {
    conn.query(cmd, function (err, rows, fields) {
      if (err) {
        console.log("error: " + err.stack);
        return -1;
      }

      if (rows && rows.length > 0)
        res.send(rows);
      else
        res.send('{"return": "empty"}');
      return rows.length;
    });
  },
  //queryCommand：返回数据库操作结果
  queryCommand: function (res, cmd) {
    conn.query(cmd, function (err, rows, fields) {
      if (err) {
        console.log("error: " + err.stack);
        return -1;
      }

      //console.log(JSON.stringify(rows));
      if (rows && rows.length > 0)
        res.send(rows.length);
      else
        res.send('{"return": "empty"}');
      return rows.length;
    });
  },
  //insertCommand：返回数据库操作结果: 新 ID
  //insertCommand: function (res, cmd) {
  //  conn.query(cmd, function (err, rows, fields) {
  //    if (err) {
  //      console.log("error: " + err.stack);
  //      return -1;
  //    }
  //
  //    //console.log(JSON.stringify(rows));
  //    if (rows.length > 0)
  //      res.send(rows.length);
  //    else
  //      res.send('{"return": "empty"}');
  //    return rows.length;
  //  });
  //},
  //getCommand：返回一条表查询数据
  getCommand: function (res, cmd) {
    //console.log(cmd);
    conn.query(cmd, function (err, rows, fields) {
      if (err) {
        console.log("error: " + err.stack);
        return -1;
      }

      if (rows && rows.length > 0)
        res.send(rows);
      else
        res.send('{"return": "empty"}');
    });
  },

  queryCommandWithoutSending: function (cmd) {
    var deferred = Q.defer();
    var row_length = 0;
    conn.query(cmd, function (err, rows,field) {
      if (err){
        //console.log('error');
        deferred.reject(err);
      }
      else{
        //console.log(rows.length);
        deferred.resolve(rows.length);
      }
    });
    return deferred.promise;
  }
}
