phina.globalize();

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);
    // 背景色
    this.backgroundColor = '#FFF';

    // 玉
    var ball = CircleShape().addChildTo(this);
    ball.stroke = false;
    ball.x = this.gridX.width/2;
    ball.y = this.gridY.width/2;
    var physical = Physical().attachTo(ball);
    ball.physical.gravity.set(0, 0.5);
    ball.physical.velocity.set(4, 8);
    ball.vy = -8; //反射時の力

    // 床
    var floor = RectangleShape({width: this.gridX.width}).addChildTo(this);
    floor.stroke = false;
    floor.setPosition(this.gridX.center(), this.gridY.width);

    // 参照用
    this.ball = ball;
    this.floor = floor;
  },

  update: function(app) {
    if (app.frame % 4 === 0) {
      
    }

    if (this.ball.hitTestElement(this.floor)) {
      // x方向の速度はキープして反射力をあてる
      var vx = this.ball.physical.velocity.x;
      this.ball.physical.force(vx, this.ball.vy);
      // めり込み防止
      this.ball.bottom = this.floor.top;
      // 摩擦
      this.ball.physical.friction = 0.97;
      // 反射力を減らす
      if (this.ball.vy < 0) this.ball.vy += 2;
    }
  },//update
  
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

