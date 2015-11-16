angular.module('starter.services', [])

  .factory('Videos', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var videos = [{
      id: 0,
      name: '高清的三维展示',
      vid: 'x0172n1hr1n',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: '在线电子杂志',
      vid: 'u0172lwnzis',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'ipad上看视频',
      vid: 'y0172c02fug',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: '汽车电子目录',
      vid: 'r0172snni0m',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: '12屏高清展示',
      vid: 'p0172vndmgg',
      face: 'img/mike.png'
    }];

    return {
      all: function() {
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

