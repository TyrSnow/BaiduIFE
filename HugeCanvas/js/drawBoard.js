(function () {
  // 画板，对canvas的封装
  /*
    1、指定视口的位置和视口的虚拟大小
    2、判断物体在不在视口里面
    3、计算视口的显示比列
    4、计算视口内物体相对于视口的坐标、尺寸
    5、将视口内的物体绘制到视口上
  */
  function DrawBoard(opt) {
    this.canvas = opt.elem;
    this.viewer = opt.viewer;
    this.width = this.canvas.width = opt.width;
    this.height = this.canvas.height = opt.height;
  }
  DrawBoard.prototype.bindEvents = function (events) {

  }
  DrawBoard.prototype.on = function (eventName, handler) {
    // 绑定事件
    //
  }
  function checkPointVisible(pt, width, height) {
    // 在框里面返回true
    if (pt[0] >= 0 && pt[1] >= 0 && pt[0] <= width && pt[1] <= height) {
      return true;
    } else {
      return false;
    }
  }
  function checkObjVisible(pts, width, height) {
    // 判断点是不是都在指定的框中（框由width和height指定）
    // 点的坐标都已经转换为框左上角为原点的坐标
    // 都不在框中返回false
    var flag = false;
    pts.map(function (pt) {
      flag = flag || checkPointVisible(pt, width, height);
    })
    return flag;
  }
  DrawBoard.prototype.calcObjArgs = function (obj) {
    // 根据viewer测算新的参数值
    var args = [];
    args[0] = (obj.args[0] - this.viewer.pos[0]) * this.viewer.scale;
    args[1] = (obj.args[1] - this.viewer.pos[1]) * this.viewer.scale;
    args[2] = util.max(obj.args[2] * this.viewer.scale, 1); // 无论缩放到什么程度都至少占一个像素？似乎没效果？
    args[3] = util.max(obj.args[3] * this.viewer.scale, 1);
    if (checkObjVisible([
      [args[0], args[1]],
      [args[0], args[1] + args[3]],
      [args[0] + args[2], args[1]],
      [args[0] + args[2], args[1] + args[3]],
    ], this.width, this.height)) {
      return args;
    }
    return false;
  }
  DrawBoard.prototype.drawObj = function (ctx, obj) {
    // 判断obj的类型，绘图
    // 先重新计算obj对于视口的参数
    var args = this.calcObjArgs(obj);
    if (args === false) {
      return;
    }
    ctx.fillStyle = obj.fillStyle || '#FF0000';
    if (obj.fill) {
      ctx.fillRect.apply(ctx, args);
    } else {
      ctx.strokeRect.apply(ctx, args);
    }

  }
  // 将当前视口的坐标转换成画板的坐标
  DrawBoard.prototype.translationPos = function (pos) {
    var _pos = [
      pos[0] / this.viewer.scale + this.viewer.pos[0],
      pos[1] / this.viewer.scale + this.viewer.pos[1]
    ];
    return _pos;
  }
  /* 把view的参数传出去*/
  DrawBoard.prototype.getViewObj = function () {
    return {
      type: 'view',
      fillStyle: '#F0F',
      fill: false,
      args: [
        this.viewer.pos[0],
        this.viewer.pos[1],
        this.width / this.viewer.scale,
        this.height / this.viewer.scale
      ]
    }
  }
  DrawBoard.prototype.render = function (objs) {
    var _this = this;
    var ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height); // 清空画布
    objs.map(function (obj) {
      // 这里的obj是有id的，
      _this.drawObj(ctx, obj);
    });
  }
  // 下面是控制类的函数
  DrawBoard.prototype.zoomIn = function () {
    this.viewer.scale+= 0.1;
  }
  DrawBoard.prototype.zoomOut = function () {
    // 最多缩小到0.1
    if (this.viewer.scale > 0.1) {
      this.viewer.scale-= 0.1;
    } else {
      message('不能再缩小了！');
    }
  }
  DrawBoard.prototype.setZoom = function (scale) {
    this.viewer.scale = scale;
  }
  DrawBoard.prototype.move = function (derect) {
    this.viewer.pos = [
      this.viewer.pos[0] - derect[0],
      this.viewer.pos[1] - derect[1]
    ];
  }
  DrawBoard.prototype.moveTo = function (pos) {
    this.viewer.pos = [
      pos[0],
      pos[1]
    ];
  }
  window.DrawBoard = DrawBoard;
})();
