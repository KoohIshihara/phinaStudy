phina.globalize();

var ASSETS = {
  image: {
    'background': './gravity.png',
  },
};

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);
    // 背景色
    this.backgroundColor = '#FFF';
    
    var tomapiko = Sprite('background').addChildTo(this);
    tomapiko.x = this.gridX.center();
    tomapiko.y = this.gridY.center();
    tomapiko.width = this.gridX.width;
    //tomapiko.height = 
  },

  update: function(app) {
    if (app.frame % 4 === 0) {
      this.createShape();
    }
  },//update
  
  createShape: function() {
    while(true){
      var x = Math.randint(0, this.gridX.width);
      var y = Math.randint(0, this.gridY.width);
      // 真ん中にはshapeを置かない！
      if( (x < this.gridX.width/4 || x > this.gridX.width*3/4) || (y < this.gridY.width/5 || y > this.gridY.width*4/5) ){
        break;
      }
    }
    var size = Math.randint(80, 120);
    // 3パターンに分岐
    switch(x%3){
      case 0:
        this.createCircle( x, y, size );
        break;
      case 1:
        this.createRect( x, y, size );
        break;
      case 2:
        this.createTriangle( x, y, size );
        break;
    }
  },
  
  createCircle: function( x, y, size ) {
    var c = CircleShape({
      x: x,
      y: y,
      fill: false,
      radius: size,
      stroke: '#FFF',
      strokeWidth: 6,
      scaleX: 0.1,
      scaleY: 0.1,
      alpha:0.0,
    }).addChildTo(this);
    this.addTween(c);
  },

  createRect: function( x, y, size ) {
    var r = RectangleShape({
      x: x,
      y: y,
      fill: false,
      width: size,
      height: size,
      stroke: '#FFF',
      strokeWidth: 6,
      cornerRadius: 8,
      scaleX: 0.1,
      scaleY: 0.1,
      alpha:0.0,
    }).addChildTo(this);
    this.addTween(r);
  },

  createTriangle: function( x, y, size ) {
    var t = TriangleShape({
      x: x,
      y: y,
      fill: false,
      radius: size,
      stroke: '#FFF',
      strokeWidth: 6,
      cornerRadius: 8,
      scaleX: 0.1,
      scaleY: 0.1,
      alpha:0.0,
    }).addChildTo(this);
    this.addTween(t);
  },
  
  addTween: function(shape) {
    shape.tweener
    .to({
      alpha:0.0,
      scaleX:1.0,
      scaleY:1.0,
      rotation: 180,
    },2000,"easwInCubic")
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
    assets: ASSETS,
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

