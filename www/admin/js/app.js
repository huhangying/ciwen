/**
 * Created by hhu on 2015/11/17.
 */

app = angular.module('admin', ['ui.bootstrap']);
var API_URL = 'http://182.92.230.67:3300';

app.controller('adminCtrl', function($scope, $http) {
  $scope.optionCat = 'Hello';


  $http.get(API_URL + '/cat')
    .then(function(response){
      if (response.data.return == 'empty'){
        alert('没有视频数据');
      }
      else{
        $scope.cats = response.data;
        if ($scope.cats != undefined && $scope.cats.length > 0){
          $scope.optionCat = $scope.cats[0].id;
        }
      }
    });

  getVideos($scope,$http);

  $scope.showEdit = true;
  $scope.master = {};
});


app.directive("add",function($document){
  return{
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope,element,attrs,ngModel){
      element.bind("click",function(){
        scope.$apply(function(){
          var video = ngModel.$modelValue;
          video.vote = 0;
          video.sort = 0;
          //alert(JSON.stringify(video));
          //if (video.cat_id == undefined){
          //  alert('请选择视频类别！');
          //  return;
          //}
          if (video.name == undefined){
            alert('标题不能为空');
            return;
          }

          insertVideo(video, scope.http);
          scope.videos.push(0, 0, video);

          $('#addVideo').modal('hide'); // call jquery function. weired, change it later!
          alert('创建视频成功，如需更新请F5刷新页面。');



        })
      });
    }
  }
});

app.directive("edit",function($document){
  return{
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope,element,attrs,ngModel){
      element.bind("click",function(){
        var classid = "class" + ngModel.$modelValue.id;
        scope.$apply(function(){
          angular.copy(ngModel.$modelValue,scope.master);
          //console.log(scope.master);
        })
        //console.log(id);
        var obj = $("."+classid);
        obj.removeClass("inactive");
        obj.addClass("active");
        obj.removeAttr("readOnly");
        scope.$apply(function(){
          scope.showEdit = false;
        })
      });
    }
  }
});

app.directive("update",function($document){
  return{
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope,element,attrs,ngModel,http){
      element.bind("click",function(){
        var classid = "class" + ngModel.$modelValue.id;
        var obj = $("."+classid);
        obj.removeClass("active");
        obj.addClass("inactive");
        obj.attr("readOnly",true);
        scope.$apply(function(){
          updateVideo(ngModel,scope.http);
          scope.showEdit = true;
        })
      })
    }
  }
});

app.directive("cancel",function($document){
  return{
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope,element,attrs,ngModel){
      element.bind("click",function(){
        scope.$apply(function(){
          angular.copy(scope.master,ngModel.$modelValue);
        })

        var classid = "class" +ngModel.$modelValue.id;
        var obj = $("."+classid);
        obj.removeClass("active");
        obj.addClass("inactive");
        obj.prop("readOnly",true);
        scope.$apply(function(){
          scope.showEdit = true;
        })
      })
    }
  }
});

app.directive("delete",function($document){
  return{
    restrict:'AE',
    require: 'ngModel',
    link:function(scope, element, attrs,ngModel){
      element.bind("click",function(){
        var id = ngModel.$modelValue.id;
        //alert("delete item where id:=" + id);
        scope.$apply(function(){
          if(!confirm('您确定删除这条记录？'))
            return;

          // delete form the db
          deleteVideo(id,scope);

          for(var i=0; i<scope.videos.length; i++){
            if(scope.videos[i].id==id){
              //console.log(scope.videos[i])
              scope.videos.splice(i,1);
            }
          }
        })
      })
    }
  }
});


// FUNCTIONS

Object.toParams = function ObjecttoParams(obj) {
  var p = [];
  for (var key in obj) {
    p.push(key + '=' + encodeURIComponent(obj[key]));
  }
  return p.join('&');
};

var getVideos = function($scope,$http){
  $http.get(API_URL + '/video')
    .then(function(response){
      if (response.data.return == 'empty'){
        alert('没有视频数据');
      }
      else{
        $scope.videos = response.data;
        $scope.http = $http;
      }
    });
}

var updateVideo = function(ngModel,$http){
  //ngModel.$modelValue.content = '';
  //alert(Object.toParams(ngModel.$modelValue));

  //alert("更新");
  $http.put(API_URL + '/video',
    //ngModel.$modelValue,{
    Object.toParams(ngModel.$modelValue),{
      dataType: 'json',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      if (response.data.return == 'empty'){
        alert('没有视频数据');
      }
      else {
        $scope.videos = response.data;
      }
    })
    .error(function(data,status, headers, config){
      alert('update video error');
    });
}

var insertVideo = function(model,$http){
  $http.post(API_URL + '/video',
    Object.toParams(model),{
      dataType: 'json',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config){
      if (response.data.return == 'error'){
        alert('insert error');
      }
      else {
        alert('done');
        //$scope.videos = response.data;
      }
    })
    .error(function(data,status, headers, config){
      alert('insert video error');
    });
}

var deleteVideo = function(id,$scope){

  $scope.http.delete(API_URL + '/video/' + id)
    .success(function(data, status, headers, config){
      if (response.data.return == 'error'){
        alert('没有视频数据');
      }
      else {
        alert('delete done');
        $scope.videos = response.data;
      }
    })
    .error(function(data,status, headers, config){
      alert('delete video error');
    });
}
