(function () {
  var ifWireFrame = false;
  var PI = util.PI;
  // 提供对modal操作的接口
  window.car = {
    render: function () {
      // 生成一个obj对象出去
      var obj = new THREE.Object3D();
      // 底盘
      var cube0 = new THREE.Mesh(
        new THREE.CubeGeometry(2, 0.2, 3),
        new THREE.MeshBasicMaterial({
          color:0x666666,
          wireframe: ifWireFrame
        })
      );
      cube0.position.set(0, -0.4, 0.5)
      obj.add(cube0);

      // 车身
      var cube1 = new THREE.Mesh(
        new THREE.CubeGeometry(2, 0.4, 2.9),
        new THREE.MeshBasicMaterial({
          color:0x666666,
          wireframe: ifWireFrame
        })
      );
      cube1.position.set(0, -0.2, 0.45)
      obj.add(cube1);

      // 车顶
      var cube2 = new THREE.Mesh(
        new THREE.CubeGeometry(2, 0.4, 1.5),
        new THREE.MeshBasicMaterial({
          color:0x666666,
          wireframe: ifWireFrame
        })
      );
      cube2.position.set(0, 0.2, 0.4)
      obj.add(cube2);

      // 四个轮子
      var wheel0 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.2),
        new THREE.MeshBasicMaterial({
          color:0xFF0000,
          wireframe: ifWireFrame
        })
      );
      wheel0.position.set(-1, -0.5, 0);
      wheel0.rotation.z = PI / 2;
      obj.add(wheel0);

      var wheel1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.2),
        new THREE.MeshBasicMaterial({
          color:0xFF0000,
          wireframe: ifWireFrame
        })
      );
      wheel1.position.set(1, -0.5, 0);
      wheel1.rotation.z = PI / 2;
      obj.add(wheel1);

      var wheel2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.2),
        new THREE.MeshBasicMaterial({
          color:0xFF0000,
          wireframe: ifWireFrame
        })
      );
      wheel2.position.set(-1, -0.5, 1.25);
      wheel2.rotation.z = PI / 2;
      obj.add(wheel2);

      var wheel3 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.2),
        new THREE.MeshBasicMaterial({
          color:0xFF0000,
          wireframe: ifWireFrame
        })
      );
      wheel3.position.set(1, -0.5, 1.25);
      wheel3.rotation.z = PI / 2;
      obj.add(wheel3);

      var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({
          color:0x00F0FF,
          side: THREE.DoubleSide
        })
      );
      plane.position.set(0, -0.7, 0);
      plane.rotation.x = PI / -2;
      obj.add(plane);

      return obj;
    }
  }
})();
