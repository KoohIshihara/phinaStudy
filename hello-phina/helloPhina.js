phina.globalize();

var addTween = function(shape){

  shape.tweener
  .to({
    alpha:0,
    scaleX:8.0,
    scaleY:8.0,
  },2000,"swing")
  .call(function(){
    shape.remove();
  });
}

var circles = []; // 動的配列的に扱うよ
var createCircle = function(){
  var i = circles.length;
  circles[i] = CircleShape().addChildTo(scene);
  var randomPosX = Math.random()*scene.gridX.width;
  var randomPosY = Math.random()*scene.gridY.width;
  circles[i].x = randomPosX;
  circles[i].y = randomPosY;
  circles[i].fill = false;
  circles[i].radius = Math.random()*20+10;
  circles[i].stroke = '#AAF';
  circles[i].strokeWidth = 0.4;
  addTween(circles[i]);
}

var createShape = function(){
  createCircle();
}

var scene;
phina.define('MainScene', {
  superClass: 'CanvasScene',
  init: function init(options) {
    this.superInit(options);
    scene = this;
    // 背景色
    this.backgroundColor = '#FFF';
    setInterval(createShape , 400);
  },// init

  update: function() {
    //app.canvas.canvas.width += 10;
    //console.log(1);
  },//update
});

var app;
phina.main(function() {
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  app = GameApp({
    startLabel: 'main',
    width: winW,
    height: winH,
  });
  app.run();
});

window.onresize = function() {
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  scene.width = winW;
  scene.height = winH;
  app.canvas.width = winW;
  app.canvas.height = winH;
  app.canvas.canvas.width = winW;
  app.canvas.canvas.height = winH;
}
