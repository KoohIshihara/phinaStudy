phina.globalize();

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);
    // 背景色
    this.backgroundColor = '#FFF';

    var canvasSize = {w: this.gridX.width, h:this.gridY.width}

    var halfX = this.gridX.width/2;
    var halfY = this.gridY.width/2;
    var circle1 = this.createCircle(halfX-100,halfY-100,40);
    var circle2 = this.createCircle(halfX+100,halfY+100,40);
    var rect = this.createRect(halfX,halfY,80);
    var triangle = this.createTriangle(halfX+100,halfY-100,60);
    // 人の絵が描かれる中心座標
    //var drawCenter = {x:this.gridX.width*3/4 ,y:this.gridY.width/2}
    //this.addMoveTween(c1, {x:x ,y:y}, {x:drawCenter.x-canvasSize.w/10 ,y:drawCenter.y-canvasSize.h/20});

    this.addCircleTween(circle1, {x:halfX-100, y:halfY-100}, {x:halfX+80, y:halfY-40});
    this.addTriangleTween(triangle, {x:halfX+100, y:halfY-100}, {x:halfX+80, y:halfY+120});
    this.addRectTween(rect, {x:halfX-100, y:halfY+100}, {x:halfX-90, y:halfY+10});
    this.addCircleTween(circle2, {x:halfX+100, y:halfY+100}, {x:halfX-90, y:halfY-120});
    
    var func = function(){

    }
    setTimeout(func , 1000);
  },

  update: function(app) {
    
  },//update
  
  createCircle: function( x, y, size ) {
    var c = CircleShape({
      x: x,
      y: y,
      fill: false,
      radius: size,
      stroke: '#000',
      strokeWidth: 2,
      scaleX: 0.1,
      scaleY: 0.1,
      alpha:0.0,
    }).addChildTo(this);
    return c;
  },

  createRect: function( x, y, size ) {
    var r = RectangleShape({
      x: x,
      y: y,
      fill: false,
      width: size,
      height: size,
      stroke: '#000',
      strokeWidth: 2,
      cornerRadius: 8,
      scaleX: 0.1,
      scaleY: 0.1,
      alpha:0.0,
    }).addChildTo(this);
    return r;
  },

  createTriangle: function( x, y, size ) {
    var t = TriangleShape({
      x: x,
      y: y,
      fill: false,
      radius: size,
      stroke: '#000',
      strokeWidth: 2,
      cornerRadius: 8,
      scaleX: 0.1,
      scaleY: 0.1,
      alpha:0.0,
    }).addChildTo(this);
    return t;
  },

  addCircleTween: function(shape, from, to) {
    shape.tweener
    .set({
      x:from.x,
      y:from.y,
      alpha:0.0,
      scaleX:0.0,
      scaleY:0.0,
      rotation:180,
    })
    .to({
      alpha:0.5,
      scaleX:1.0,
      scaleY:1.0,
      rotation:360,
    },800,"easwInCubic")
    .to({
      alpha:1.0,
      x:to.x,
      y:to.y,
    },400,"easwInCubic") 
  },

  addRectTween: function(shape, from, to) {
    shape.tweener
    .set({
      x:from.x,
      y:from.y,
      alpha:0.0,
      scaleX:0.0,
      scaleY:0.0,
      rotation:180,
    })
    .to({
      alpha:0.5,
      scaleX:1.0,
      scaleY:1.0,
      rotation:360,
    },800,"easwInCubic")
    .to({
      alpha:1.0,
      x:to.x,
      y:to.y,
      height: 130,
    },400,"easwInCubic") 
  },

  addTriangleTween: function(shape, from, to) {
    shape.tweener
    .set({
      x:from.x,
      y:from.y,
      alpha:0.0,
      scaleX:0.0,
      scaleY:0.0,
      rotation:180,
    })
    .to({
      alpha:0.5,
      scaleX:1.0,
      scaleY:1.0,
      rotation:360,
    },800,"easwInCubic")
    .to({
      alpha:1.0,
      x:to.x,
      y:to.y,
      scaleX:0.8,
      scaleY:1.2,
      radius:80,
    },400,"easwInCubic") 
  },

});

phina.main(function() {
  var winW = window.innerWidth/2;//if mobile var winW = window.innerWidth
  var winH = window.innerHeight;
  var app = GameApp({
    startLabel: 'main',
    width: 400,
    height: 400,
    fit: false,
    query: '#test',
  });
  app.run();
});
