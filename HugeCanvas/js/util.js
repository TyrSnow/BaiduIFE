(function () {
  var util = {
    calcRange: function (objs) {
      // 计算一堆物体占有的空间
      var minX, minY,
          maxX, maxY;
      objs.map(function (obj) {
        minX = util.min(minX, obj.args[0]);
        minY = util.min(minY, obj.args[1]);
        maxX = util.max(maxX, obj.args[0] + obj.args[2]);
        maxY = util.max(maxY, obj.args[1] + obj.args[3]);
      });
      return [
        minX - 5,
        minY - 5,
        maxX - minX + 5,
        maxY - minY + 5
      ]
    },
    max: function (a, b) {
      return a > b ? a : b;
    },
    min: function (a, b) {
      return a < b ? a : b;
    }
  }

  window.util = util;
})();
