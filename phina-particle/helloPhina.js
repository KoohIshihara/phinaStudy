/*
 * Runstant
 * 思いたったらすぐ開発. プログラミングに革命を...
 */


// グローバルに展開
phina.globalize();

/*
 * サークルクラス
 */
phina.define('Circle', {
  superClass: 'CircleShape',

  init: function(options) {
    options = (options || {}).$safe({
      fill: '#00F',  // 塗りつぶし色
      stroke: null, // ストローク色
      radius: 100, // 半径
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


/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',

  // 初期化
  init: function() {
    // super init
    this.superInit();

    // 背景色
    this.backgroundColor = '#000';

    // デフォルトでいくつか生成
    (30).times(function() {
      var x = Math.randint(0, this.gridX.width);
      var y = Math.randint(0, this.gridY.width);


      this.addCircle(x, y, 10, 1.0, 1.0);      
      
    }, this);
  },

  // サークルを追加
  addCircle: function(x, y, radius, scaleX, scaleY) {
    var color = '#44F';

    // サークルを生成
    var circle = Circle({
      fill: color,
      x: x,
      y: y,
      radius: radius,
      scaleX: scaleX,
      scaleY: scaleY,
    }).addChildTo(this);
  },
});
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    startLabel: 'main', // MainScene から開始
  });

  app.enableStats();

  // 実行
  app.run();
});
