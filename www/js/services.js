angular.module('starter.services', [])

  .factory('Videos', function() {
    // Might use a resource here that returns a JSON array
    var cats = [{
      id: '1',
      name: '暗黑者 第一季',
      desc: '',
      img: 'img/ben.png'
    }, {
      id: '2',
      name: '暗黑者 第二季',
      desc: '',
      img: 'img/max.png'
    }, {
      id: '3',
      name: '暗黑者 第三季',
      desc: '',
      img: 'img/adam.jpg'
    }, {
      id: '4',
      name: '其他',
      desc: '',
      img: 'img/adam.jpg'
    }];

    // Some fake testing data
    var videos = [{
      id: 0,
      name: '高清的三维展示',
      url: 'x0172n1hr1n',
      screenshot: 'img/ben.png',
      author: '作者',
      content:'视频内容介绍..'
    }, {
      id: 1,
      name: '在线电子杂志',
      url: 'u0172lwnzis',
      screenshot: 'img/max.png',
      author: '作者',
      content:'视频内容介绍..'
    }, {
      id: 2,
      name: 'ipad上看视频',
      url: 'y0172c02fug',
      screenshot: 'img/adam.jpg',
      author: '作者',
      content:'视频内容介绍..'
    }, {
      id: 3,
      name: '汽车电子目录',
      url: 'r0172snni0m',
      screenshot: 'img/perry.png',
      author: '作者',
      content:'视频内容介绍..'
    }, {
      id: 4,
      name: '12屏高清展示',
      url: 'p0172vndmgg',
      screenshot: 'img/mike.png',
      author: '作者',
      content:'视频内容介绍..'
    }];

    return {
      catList: function() {
        return cats;
      },
      getBycatId: function(catId) {
        return videos;
      },
      remove: function(video) {
        videos.splice(videos.indexOf(video), 1);
      },
      get: function(vid) {
        for (var i = 0; i < videos.length; i++) {
          if (videos[i].id === parseInt(vid)) {
            return videos[i];
          }
        }
        return null;
      }
    };
  });

