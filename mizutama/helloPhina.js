phina.globalize();

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);
    // 背景色
    this.backgroundColor = '#FFF';
  },

  update: function(app) {
    if (app.frame % 4 === 0) {
      this.createShape();
    }
  },//update
  
  createShape: function() {
    this.createCircle();
  },
  
  createCircle: function() {
    var x = Math.randint(0, this.gridX.width);
    var y = Math.randint(0, this.gridY.width);
    var c = CircleShape({
      x: x,
      y: y,
      fill: false,
      radius: Math.randint(80, 120),
      stroke: 'hsl({0}, 100%, 50%)'.format(Math.randint(0, 360)),
      strokeWidth: 8,
      scaleX: 0.1,
      scaleY: 0.1,
    }).addChildTo(this);
    this.addTween(c);
  },
  
  addTween: function(shape) {
    shape.tweener
    .to({
      alpha:0,
      scaleX:1.0,
      scaleY:1.0,
    },2000,"swing")
    .call(function(){
      shape.remove();
    });
  },
});

phina.main(function() {
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  var app = GameApp({
    startLabel: 'main',
    width: winW,
    height: winH,
    fit: false,
  });
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

