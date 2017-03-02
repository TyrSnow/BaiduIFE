(function () {
  var app = {
    renderer: null,
    camera: null,
    scene: null,
    cameraPos: {
      x: 3.9,
      y: 0,
      z: 5
    },
    updateScene: function (modal) {
      this.scene.add(modal);
      this.renderer.render(this.scene, this.camera );
    },
    updateCamera: function(x, y, z) {
      this.camera.position.set(x, y, z);
      this.camera.lookAt(this.scene.position);
      this.renderer.render(this.scene, this.camera );
    },
    render: function () {
      this.renderer.render(this.scene, this.camera);
    },
    init: function () {
      var canvasdiv = document.getElementById('app');
      var width = canvasdiv.clientWidth;
      var height = canvasdiv.clientHeight;
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( width, height );
      canvasdiv.appendChild( renderer.domElement );
      this.renderer = renderer;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45,4/3,1,1000);
      this.scene.add(this.camera);  // 将照相机添加到场景中
    },
    start: function () {
      this.init();
      this.updateScene(car.render());
      this.updateCamera(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z);
      this.render();
      this.bindEvent();
    },
    bindEvent: function () {
      var that = this;
      document.getElementById('moveLeft').onclick = function () {
        that.cameraPos.x = that.cameraPos.x - util.STEPLENGTH;
        that.updateCamera(that.cameraPos.x, that.cameraPos.y, that.cameraPos.z);
        event.stopPropagation();
      }
      document.getElementById('moveRight').onclick = function () {
        that.cameraPos.x = that.cameraPos.x + util.STEPLENGTH;
        that.updateCamera(that.cameraPos.x, that.cameraPos.y, that.cameraPos.z);
        event.stopPropagation();
      }
      document.getElementById('moveForward').onclick = function () {
        that.cameraPos.z = that.cameraPos.z - util.STEPLENGTH;
        that.updateCamera(that.cameraPos.x, that.cameraPos.y, that.cameraPos.z);
        event.stopPropagation();
      }
      document.getElementById('moveBackward').onclick = function () {
        that.cameraPos.z = that.cameraPos.z + util.STEPLENGTH;
        that.updateCamera(that.cameraPos.x, that.cameraPos.y, that.cameraPos.z);
        event.stopPropagation();
      }
      document.getElementById('moveUp').onclick = function () {
        that.cameraPos.y = that.cameraPos.y + util.STEPLENGTH;
        that.updateCamera(that.cameraPos.x, that.cameraPos.y, that.cameraPos.z);
        event.stopPropagation();
      }
      document.getElementById('moveDown').onclick = function () {
        that.cameraPos.y = that.cameraPos.y - util.STEPLENGTH;
        that.updateCamera(that.cameraPos.x, that.cameraPos.y, that.cameraPos.z);
        event.stopPropagation();
      }
    }
  }
  app.start();
})();
