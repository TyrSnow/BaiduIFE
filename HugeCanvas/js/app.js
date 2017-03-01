(function () {
  // 负责基础的业务逻辑
  // 数据存在这里
  var boardBox = document.getElementById('boardBox');
  var preview = document.getElementById('previewBox');
  var canvases = [
    new DrawBoard({
      elem: document.getElementById('canvas_board'),
      width: boardBox.clientWidth,
      height: boardBox.clientHeight,
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
      width: previewBox.clientWidth,
      height: previewBox.clientHeight,
      viewer: {
        pos: [-10, -10],
        scale: 0.5,
      },
    })
  ];
  // 随机生成1000个小方块
  var objs = util.createRandomRect(1000, 1000, 1000, 10, 10);
  // var objs = [
  //   {
  //     type: 'rect',
  //     fill: true,
  //     args: [0, 0, 50, 100]
  //   },{
  //     type: 'rect',
  //     args: [1366,768, 50, 100]
  //   },{
  //     type: 'rect',
  //     fill: true,
  //     args: [55,105, 50, 100]
  //   }
  // ]
  var id;
  var changed = true;
  var curCommand = 'view'; //与handler对应取值
  var activeObj;
  var render = function() {
    /*
      TODO:
      render前把viewer添加到objs
    */
    if (changed) {
      canvases[0].render(objs);
      var viewer = canvases[0].getViewObj();
      var objs1 = [viewer].concat(objs);
      var range = util.calcRange(objs1); // 计算整个图幅的占地情况（返回左上右下的坐标）
      var scale = util.min(
        canvases[1].width / range[2],
        canvases[1].height / range[3]
      )
      canvases[1].setZoom(scale);
      canvases[1].moveTo([range[0], range[1]]);
      canvases[1].render(objs1);
      changed = false;
      console.log('Rendered.')
    }
    id = requestAnimationFrame(render);
  }
  /*
    TODO:
    当移动视口的时候需要把preview里的那个框一块移动
    新建obj的时候需要把obj的占地情况计算一下
  */
  var controls = {
    viewer: {
      zoomIn: function () {
        canvases[0].zoomIn();
        changed = true;
      },
      zoomOut: function () {
        canvases[0].zoomOut();
        changed = true;
      },
      move: function (derect) {
        // 这里是原始的位移，需要在DrawBoard里面重新计算
        canvases[0].move(derect);
        changed = true;
      }
    },
    obj: {
      addObj: function (obj) {
        objs.push(obj);
        changed = true;
        return objs.length - 1;
      },
      resizeObj: function (index, width, height) {
        objs[index].args[2] = width;
        objs[index].args[3] = height;
        changed = true;
      }
    }
  }
  var TOPBLANKHEIGHT = 50;
  var handler = {
    drawRect: {
      oriObjX: 0,
      oriObjY: 0,
      objIndex: -1,
      ifMouseDown: false,
      handleMouseDown: function (e) {
        // 计算鼠标相对坐标原点的坐标
        var pos = canvases[0].translationPos([e.offsetX, e.offsetY]);
        var obj = {
          type: 'rect',
          fill: true,
          args: [pos[0], pos[1], 1, 1]
        }
        this.objIndex = controls.obj.addObj(obj);
        this.oriObjX = pos[0];
        this.oriObjY = pos[1];
        this.ifMouseDown = true;
      },
      handleMouseMove: function (e) {
        if (!this.ifMouseDown) return;
        // 持续修改新建的rect的尺寸
        var pos = canvases[0].translationPos([e.offsetX, e.offsetY]);
        controls.obj.resizeObj(
          this.objIndex,
          pos[0] - this.oriObjX,
          pos[1] - this.oriObjY
        )
      },
      handleMouseUp: function (e) {
        this.ifMouseDown = false;
        // 画好之后命令返回view
        curCommand = 'view';
      }
    },
    drawCircle: {
      oriObjX: 0,
      oriObjY: 0,
      objIndex: -1,
      ifMouseDown: false,
      handleMouseDown: function (e) {

      },
      handleMouseMove: function (e) {

      },
      handleMouseUp: function (e) {

      }
    },
    view: {
      lastMouseX: 0,
      lastMouseY: 0,
      ifMouseDown: false,
      handleMouseDown: function (e) {
        this.lastMouseX = e.screenX;
        this.lastMouseY = e.screenY;
        this.ifMouseDown = true;
      },
      handleMouseMove: function (e) {
        if (!this.ifMouseDown) return;
        var curX = e.screenX;
        var curY = e.screenY;
        var derect = [
          curX - this.lastMouseX,
          curY - this.lastMouseY
        ];
        this.lastMouseX = curX;
        this.lastMouseY = curY;
        controls.viewer.move(derect);
      },
      handleMouseUp: function (e) {
        this.ifMouseDown = false;
      }
    }
  }
  // 把事件和处理函数联系起来
  function bindEvent($app) {
    /*
      处理视口缩放
      TODO:
      可以针对鼠标所在位置为中心进行缩放
    */
    $app.on('mousewheel', function (event, delta) {
      //向下是负
      if (delta < 0) {
        controls.viewer.zoomOut();
      } else {
        controls.viewer.zoomIn();
      }
    });

    /*
      处理按钮操作
    */
    $app.on('click', '[data-command]', function (e) {
      var $this = $(this);
      var command = $this.attr('data-command');
      curCommand = command;
      return false;
    })
    /*
      处理视口拖动
    */
    $app.on('mousedown', '.board', function (e) {
      handler[curCommand].handleMouseDown(e);
    });
    $app.on('mousemove', '.board', function (e) {
      handler[curCommand].handleMouseMove(e);
    });
    $app.on('mouseup mouseleave', '.board', function (e) {
      handler[curCommand].handleMouseUp(e);
    });
  }
  var start = function () {
    bindEvent($('.app'));
    id = requestAnimationFrame(render);
  }
  start();
})();
