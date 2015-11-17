/**
 * Created by hhu on 2015/11/17.
 */

var app = angular.module('admin', ['ui.bootstrap']);

app.controller('adminCtrl', function($scope) {
  $scope.name = 'World';
  $scope.employees =[
    {id:101, name:'John', phone:'555-1276', author:'dsd',url:'',dl_url:''},
    {id:102, name:'Mary', phone:'800-1233', author:'dsd',url:'',dl_url:''},
    {id:103,name:'Mike', phone:'555-4321', author:'dsd',url:'',dl_url:''},
    {id:104,name:'Adam', phone:'555-5678', author:'dsd',url:'',dl_url:''},
    {id:105,name:'Julie', phone:'555-8765', author:'dsd',url:'',dl_url:''},
    {id:106,name:'Juliette', phone:'555-5678', author:'dsd',url:'',dl_url:''}];
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

app.directive("update",function($document){
  return{
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope,element,attrs,ngModel){
      element.bind("click",function(){
        //alert(ngModel.$modelValue + " 更新.");
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

