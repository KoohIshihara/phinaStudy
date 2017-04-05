
phina.main(function() {
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  var app = GameApp({
    query: '#particlesCanvas',
    startLabel: 'title',
    width: winW,
    height: winH,
    fit: false,
    assets: ASEETS,
    scenes: [
      {
        className: 'TitleScene',
        label: 'title',
        nextLabel: 'main',
      },
      {
        className: 'MainScene',
        label: 'main',
      },
    ],
  });
  //app.enableStats();
  app.run();

  /*
  var app2 = GameApp({
    startLabel: 'nowload',
    width: winW,
    height: winH,
    fit: false,
    query: '#loadingCanvas',
    scenes: [
      {
        className: 'nowLoadScene',
        label: 'nowload',
      },
    ],
  });
  app2.run();
  */

  window.onresize = function() {
    /*
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var scene = app.currentScene;
    scene.width = winW;
    scene.height = winH;
    scene.canvas.width = winW;
    scene.canvas.height = winH;
    scene.gridX.width = winW;
    scene.gridY.width = winH;
    app.width = winW;
    app.height = winH;
    app.canvas.width = winW;
    app.canvas.height = winH;
    app.canvas.canvas.width = winW;
    app.canvas.canvas.height = winH;
    SCREEN_WIDTH = winW;
    SCREEN_HEIGHT = winH;
    */
  }
});

