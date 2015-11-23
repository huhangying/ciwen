var SITE_API_URL = "http://182.92.230.67:3300";
var reCell = new RegExp(/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/);

angular.module('starter.controllers', ['ngCordova'])

  .controller('HomeCtrl', function($scope,$http) {
    //$cordovaProgress.showAnnular(true, 50000);
    $scope.title = '<img src="img/logo.png" alt="首页" height="40px" />'


    $scope.videoHeight = function(){
      var winWidth = 0;
      if (window.innerWidth)
        winWidth = window.innerWidth;
      else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
      {
        winWidth = document.documentElement.clientWidth;
      }
      return winWidth * 10 / 16;
    }
  })

  .controller('SignInCtrl', function($scope, $state, $http,$cordovaToast,$rootScope) {
    //初始化 手机号和密码 for test
    $scope.user ={cell: "15601811217", password: "111111", authorized: false};

    var user = $scope.user;
    $scope.signIn = function(user) {

      if (user.cell == ''){
        $cordovaToast.showShortCenter('手机号不能为空');
        return;
      }
      if (!reCell.test(user.cell)){
        //alert(user.cell);
        $cordovaToast.showShortCenter('手机号不合法');
        return;
      }
      if (user.password == ''){
        $cordovaToast.showShortCenter('密码不能为空');
        return;
      }
      $http.get('http://182.92.230.67:3300/user/'+ user.cell).then(function(response){

        if (response.data.return == 'NotFound'){
          $cordovaToast.showShortCenter('用户不存在');
          return;
        }
        if (response.data[0].password == user.password){

          localStorage['cell'] = user.cell;
          localStorage['name'] = response.data[0].user_name;
          //storage["pwd"] =  user.password;;
          //storage["isstorePwd"] =  "yes";
          localStorage['authorized'] = 'yes';
          //localStorage['previous_state'] = '';//TrackPreviousState.getPrevious();

          // 如果状态是播放视频页，改到视频分类页（因为视频页带参数）
          if ($rootScope.previousState == 'tab.video-detail')
            $rootScope.previousState = 'tab.cat';

          $state.go($rootScope.previousState != '' ? $rootScope.previousState : 'tab.home'); // 回到要求鉴权的页面
        }
        else{
          storage['cell'] = user.cell;
          storage['name'] = '';
          storage['authorized'] = 'no'
          // warning
          $cordovaToast.showShortCenter('手机号或密码错误');
        }
      });
    };


  })

  // 注册 控制模块
  .controller('RegisterCtrl', function($scope, $state, $http, $cordovaToast,$rootScope) {
    //初始化 手机号和密码 for test
    $scope.user ={cell: "15601811217", password: "111111", name: 'test'};

    Object.toParams = function ObjecttoParams(obj) {
      var p = [];
      for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
    };

    var user = $scope.user;
    $scope.register = function(user) {

      if (!user.cell) {
        $cordovaToast.showShortCenter('手机号不能为空');
        return;
      }
      if (!reCell.test(user.cell)){
        $cordovaToast.showShortCenter('手机号不合法');
        return;
      }
      if (!user.name) {
        $cordovaToast.showShortCenter('用户名不能为空');
        return;
      }
      if (!user.password) {
        $cordovaToast.showShortCenter('密码不能为空');
        return;
      }

      $http.post('http://182.92.230.67:3300/user',Object.toParams(user), {
        dataType: 'json',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        //$http({
        //    method: 'POST',
        //    url: 'http://182.92.230.67:3300/user',
        //    data: Object.toParams(user),
        //    dataType: 'json',
        //    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //  })
        .success(function(data, status, headers, config){
          if (data.return == 'existed')
            $cordovaToast.showShortCenter('用户已经存在');
          else if (data.return == 'error')
            $cordovaToast.showShortCenter('用户注册出错');
          else{
            $cordovaToast.showShortCenter('用户注册成功');

            localStorage['cell'] = user.cell;
            localStorage['name'] = user.name;
            localStorage['authorized'] = 'yes';
            $state.go($rootScope.previousState != '' ? $rootScope.previousState : 'tab.home'); // 回到要求鉴权的页面
          }
        })
        .error(function(data,status, headers, config){
          console.log('insert user error');
          $cordovaToast.showShortCenter('用户注册出错');
        });

    }
  })

  // 分类 控制模块
  .controller('CatCtrl', function($scope,Videos, $state, $q,$http,$cordovaToast) {

    // 构建页面数据
    Videos.catList() // return a cats promise
      .then(function(data){
        $scope.cats = data;
        if(!$scope.cats || $scope.cats.length < 1) return;

        $scope.optionCat = $scope.cats[0].id;
      },
      function(data){ // error
        $scope.cats = [];
        $cordovaToast.showShortCenter('没有视频');
        return;
      });


    $scope.getVideosByCatId = function(catId) {

      $http.get('http://182.92.230.67:3300/cat/'+ catId).then(function(response){

        if (response.data.return == 'empty'){
          $scope.videos = [];
          $cordovaToast.showShortCenter('该类别下面没有视频');
          return;
        }
        $scope.videos = response.data;
      });
    };

    $scope.getVideosByCatId($scope.optionCat);

    $scope.selectAction = function(optionCat) {
      $scope.optionCat = optionCat;
      // 获取视频列表
      this.getVideosByCatId(optionCat);
    }

    $scope.voteIt = function(id){
      $http.get('http://182.92.230.67:3300/video/vote/' + id).then(function(response) {
        if (response.data.return == 'error'){
          //$cordovaToast.showShortCenter('视频不存在');
          return;
        }
        //$scope.video.vote += 1;
        $cordovaToast.showShortCenter('谢谢支持！');
      })
    }

    $scope.doRefresh = function(){
      this.getVideosByCatId($scope.optionCat);

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }


  })

  // 视频 控制模块
  .controller('VideoDetailCtrl', function($scope, $stateParams, Videos,$location, $state,$http,$cordovaToast) {

    if (window.localStorage['authorized'] != 'yes'){
      $state.go('signin');
      return;
    }

    var id = $location.search().id;
    $http.get('http://182.92.230.67:3300/video/' + id).then(function(response) {
      if (response.data.return == 'empty') {
        //$cordovaToast.showShortCenter('视频不存在');
        return;
      }
      $scope.video = response.data[0];
    });
    $scope.videosrc = "mvqq.html?vid=" + $location.search().vid;


    $scope.videoHeight = function(){
      var winWidth = 0;
      //获取窗口宽度
      if (window.innerWidth)
        winWidth = window.innerWidth;
      else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
      //通过深入Document内部对body进行检测，获取窗口大小
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
        winWidth = document.documentElement.clientWidth;
      }
      return winWidth * 10 / 16;
    }

    $scope.voteIt = function(){
      $http.get('http://182.92.230.67:3300/video/vote/' + $scope.video.id).then(function(response) {
        if (response.data.return == 'error'){
          //$cordovaToast.showShortCenter('视频不存在');
          return;
        }
        //$scope.video = response.data[0];
        //alert(JSON.stringify($scope.video));
        $scope.video.vote += 1;
        $cordovaToast.showShortCenter('谢谢支持！');
      })
    }

  })

  // 片花 控制模块
  .controller('TrailerCtrl', function($scope,$state, $http,$cordovaDevice) {

    // 设备信息 for test
    $scope.manufacturer=$cordovaDevice.getManufacturer();
    $scope.model=$cordovaDevice.getModel();
    $scope.platform=$cordovaDevice.getPlatform();
    $scope.uuid=$cordovaDevice.getUUID();
    //$scope.isOnline = $cordovaNetwork.isOnline();
  })

  .controller('AccountCtrl', function($scope, $state,$rootScope,$http,$cordovaToast) {

    if (!localStorage['authorized'] || localStorage['authorized'] != 'yes'){
      $state.go('signin');
      return;
    }

    $scope.settings = {
      enableRotation: true
    };

    $scope.cell = '';
    if (!localStorage['cell'])
      $scope.user_name = '我未登录';
    else{
      $scope.user_name = localStorage['name'];
      $scope.cell == '(' + localStorage['cell'] + ')';
    }

    $scope.logout = function(){
      localStorage['cell'] = '';
      localStorage['name'] = '';
      localStorage['authorized'] = '';
      $rootScope.previousState = '';
      $state.go('tab.home');
    }

    $http.get('http://182.92.230.67:3300/video').then(function(response) {
      if (response.data.return == 'empty') {
        $cordovaToast.showShortCenter('我没有投票记录，赶紧去投票吧！');
        return;
      }
      $scope.videos = response.data;
      //alert(JSON.stringify($scope.videos));
    });

  });


