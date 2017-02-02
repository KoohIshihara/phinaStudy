phina.globalize();

var addTween = function(shape){
  /*
  shape.tweener
  .to({
    rotation:360,
    scaleX:2.0,
    scaleY:2.0,
  },1000,"swing")
  .to({
    rotation:720,
  },1000,"swing")
  .to({
    rotation:360,
    scaleX:0.0,
    scaleY:0.0,
  },1000,"swing")
  .call(function(){
    shape.remove();
  });
  */

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
  createCircle();
  createCircle();
}

var scene;
phina.define('MainScene', {
  superClass: 'CanvasScene',
  init: function init() {
    this.superInit();
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
  app = GameApp({
    startLabel: 'main',
  });
  /*winW = window.innerWidth;
  var winH = window.innerHeight;
  app.canvas.canvas.width = winW;
  app.canvas.canvas.height = winH;*/
  app.run();
});