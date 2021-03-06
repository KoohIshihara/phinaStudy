phina.globalize();

// サークルクラス
phina.define('Circle', {
  superClass: 'CircleShape',

  init: function(options) {
    options = (options || {}).$safe({
      fill: '#00F',
      stroke: null, 
      radius: 100,
      scaleX: 1.0,
      scaleY: 1.0,
    });
    this.superInit(options);

    this.vx = Math.randint(1, 4);
    this.vy = Math.randint(1, 4);
    this.blendMode = 'lighter';
  },

  update: function() {
    this.x += this.vx;
    this.y += this.vy;
  },
});

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);
    // 背景色
    this.backgroundColor = '#FFF';

    // テキスト
    var label = Label("physical test !!").addChildTo(this);
    label.x = this.gridX.center();
    label.y = this.gridY.center();
    label.rotation = 40;

    // 玉
    var ball = RectangleShape().addChildTo(this);
    ball.rotation = 30;
    ball.stroke = false;
    ball.x = this.gridX.center()
    ball.y = this.gridY.center()
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

