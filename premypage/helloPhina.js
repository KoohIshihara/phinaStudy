phina.globalize();

phina.define('VisualizeRect', {
  superClass: 'Shape',

  init: function(options) {
    // 引数が指定されなかった時のデフォルト値
    options = (options || {}).$safe({
      backgroundColor: '#999',
      scaleX: 0.02,
      scaleY: 0.05,
    });
    this.superInit(options);
    // 基準点の変更
    this.setOrigin(0.0, 0.5);

    this.index = options.index;
    this.radian = 0;
  },

  update: function(app) {
  
    if(GLOBAL.spectrumsArray[this.index] && app.frame % 4 === 0){
      //this.width = 4+GLOBAL.spectrumsArray[this.index]/3;
      this.scaleX = 0.02 + GLOBAL.spectrumsArray[this.index]/255;

      if(GLOBAL.spectrumsArray[this.index]==0){
        this.scaleX = 0.02;
      }
    }
  
    /*
    this.radian++;
    this.width = 4 + Math.sin(this.radian);
    */
  }
});


phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);
    // 背景色
    this.backgroundColor = '#FFF';

    this.createVisualiza(this.gridX.width/2, this.gridY.width/2);

    
  },

  update: function(app) {
    if (app.frame % 4 === 0) {
      
    }
  },//update

  addVisualizeRect: function(x, y, width, height, rotation, index) {
    var visRect = VisualizeRect({
      x: x,
      y: y,
      width: width,
      height: height,
      rotation: rotation,
      index: index,
    }).addChildTo(this);
  },

  createVisualiza: function(x, y) {
    var theta = 0;
    var radius = 40;
    
    // 64個ver
    for(var i=-16; i<48; i++){
      var visRecX = Math.cos(i*5.625 * (Math.PI / 180))*radius;
      var visRecY = Math.sin(i*5.625 * (Math.PI / 180))*radius;
      this.addVisualizeRect(x+visRecX, y+visRecY, 80, 20, i*5.625, i+16);
      //--------------------x座標, y, width, height, rotation, index番号
    }
    
    /*
    // 32個ver
    for(var i=-8; i<24; i++){
      var visRecX = Math.cos(i*11.25 * (Math.PI / 180))*radius;
      var visRecY = Math.sin(i*11.25 * (Math.PI / 180))*radius;
      this.addVisualizeRect(x+visRecX, y+visRecY, 4, 4, i*11.25, i+8);
      //--------------------x座標, y, width, height, rotation, index番号
    }
    */
  },

});


phina.main(function() {
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  var app = GameApp({
    query: '#visualiza',
    startLabel: 'main',
    width: winW,
    height: 400,//winH
    fit: false,
  });
  app.enableStats();
  app.fps=60;
  app.run();
  
  window.onresize = function() {
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
  }
});

