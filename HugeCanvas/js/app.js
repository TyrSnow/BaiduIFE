(function () {
  // 负责基础的业务逻辑
  // 数据存在这里
  var canvases = [
    new DrawBoard({
      elem: document.getElementById('canvas_board'),
      viewer: {
        pos: [-10, -10],
        scale: 1,
      },
      events: {
        click: function () {

        }
      }
    }),
    new DrawBoard({
      elem: document.getElementById('canvas_preview'),
      viewer: {
        pos: [-10, -10],
        scale: 0.5,
      },
    })
  ];
  var objs = [{
    type: 'rect',
    args: [0, 0, 50, 100]
  },{
    type: 'rect',
    args: [-100, -200, 50, 100]
  }]
  var id;
  var changed = true;
  var render = function() {
    /*
      TODO:
      render前把viewer添加到objs
    */
    if (changed) {
      canvases.map(function (canvas) {
        canvas.render(objs);
      });
      changed = false;
      console.log('Rendered.')
    }
    id = requestAnimationFrame(render);
  }
  var controls = {
    zoomIn: function () {
      canvases[0].zoomIn();
      changed = true;
    },
    zoomOut: function () {
      canvases[0].zoomOut();
      changed = true;
    }
  }
  // 这里主要处理视口移动的问题
  function bindEvent() {
    $('.app').on('mousewheel', function (event, delta) {
      //向下是负
      if (delta < 0) {
        controls.zoomOut();
      } else {
        controls.zoomIn();
      }
    });

  }
  var start = function () {
    bindEvent();
    id = requestAnimationFrame(render);
  }
  start();
})();
