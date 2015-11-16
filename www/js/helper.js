/**
 * Created by hhu on 2015/11/14.
 */

$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {

  $rootScope.previousState = $state.href(from, fromParams);
  // $state.href(from, fromParams)

});

function showCenter(msg){
  window.plugins.toast.showShortTop(msg,
    function(a){console.log('toast success: ' + a)},
    function(b){alert('toast error: ' + b)})
}

function showShortCenter(msg){
  showToast(msg, 'short','center');
}
function showLongCenter(msg){
  showToast(msg, 'long','center');
}
function showToast(msg, duration, position) {
  window.plugins.toast.showWithOptions(
    {
      message: msg,
      duration: duration,
      position: position
      //,addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    },
    onSuccess, // optional
    onError    // optional
  );
}
