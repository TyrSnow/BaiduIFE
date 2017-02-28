;/*
  显示小提示框
*/
(function () {
  var $app = $('.app');
  // 没有message的结构
  var $msg = $app.find('.m-msg');
  if ($msg.length === 0) {
    $msg = $('<div class="m-msg"></div>');
    $msg.hide();
    $app.append($msg);
  }
  var inter;
  function message(msg) {
    clearTimeout(inter);
    $msg.html(msg);
    $msg.fadeIn();
    inter = setTimeout(function () {
      $msg.fadeOut();
    }, 1000);
  }
  window.message = message;
})();
