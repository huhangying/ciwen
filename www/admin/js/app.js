/**
 * Created by hhu on 2015/11/17.
 */

var app = angular.module('admin', ['ui.bootstrap']);

app.controller('adminCtrl', function($scope, $http) {

  $scope.name = 'Hello';
  $http.get('http://182.92.230.67:3300/video')
    .then(function(response){
      if (response.data.return == 'empty'){
        alert('没有视频数据');
      }
      else
        $scope.videos = response.data;
    });
  $scope.showEdit = true;
  $scope.master = {};
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

var updateVideo = function(ngModel){
 alert(Object.toParams(ngModel.$modelValue));

  //alert("更新");
  //$http.put('http://182.92.230.67:3300/video/update',
  //  //ngModel.$modelValue,{
  //  Object.toParams(ngModel.$modelValue),{
  //    dataType: 'json',
  //    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //  })
  //  .success(function(data, status, headers, config){
  //    if (response.data.return == 'empty'){
  //      alert('没有视频数据');
  //    }
  //    else {
  //      $scope.videos = response.data;
  //    }
  //  })
  //  .error(function(data,status, headers, config){
  //    console.log('insert video error');
  //  });
}


app.directive("update",function($document){
  return{
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope,element,attrs,ngModel,$http){
      element.bind("click",function(){
        var classid = "class" + ngModel.$modelValue.id;
        var obj = $("."+classid);
        obj.removeClass("active");
        obj.addClass("inactive");
        obj.attr("readOnly",true);
        scope.$apply(function(){
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
          //console.log(ngModel.$modelValue);
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
        alert("delete item where employee id:=" + id);
        scope.$apply(function(){
          for(var i=0; i<scope.employees.length; i++){
            if(scope.employees[i].id==id){
              console.log(scope.employees[i])
              scope.employees.splice(i,1);
            }
          }
          console.log(scope.employees);
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
