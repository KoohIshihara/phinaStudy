phina.globalize();

phina.define('Circle', {
  superClass: 'CircleShape',

  init: function(options) {
    options = (options || {}).$safe({
      fill: '#FFF',  // 塗りつぶし色
      stroke: null, // ストローク色
      radius: 1, // 半径
    });
    this.superInit(options);
    this.blendMode = 'lighter';
  },

  update: function() {

  },
});

phina.define('MainScene', {
  superClass: 'CanvasScene',
  
  init: function init() {
    this.superInit();

    // 背景色
    this.backgroundColor = '#FF0';

    var circle = CircleShape().addChildTo(this);
    circle.x = 200; // x 座標を指定
    circle.y = 480; // y 座標を指定
    
    (200).times(function() {
      var randomX = Math.random()*window.innerWidth;
      var randomY = Math.random()*window.innerHeight;
      this.addCircle(randomX, randomY, 20);      
    }, this);

  },// init

  update: function() {

  },//update

  // circleを追加する関数
  addCircle: function(x, y, radius) {
    var color = '#4FF';
    // サークルを生成
    var circle = Circle({
      fill: color,
      x: x,
      y: y,
      radius: radius,
    }).addChildTo(this);
  },// addCircle
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
  });
  app.run();
});

