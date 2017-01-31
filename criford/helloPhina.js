
// グローバルに展開
phina.globalize();

/*
 * サークルクラス
 */

var x = 0;
var y = 0;

var a = 1.4;
var b = 1.6;
var c = 1.0;
var d = 1.7;

var aRadian = 0;
var bRadian = 90;
var cRadian = 180;
var dRadian = 270;

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

    // クリフォードアトラクタ式
    a = Math.cos(aRadian)*3.0;
    b = Math.cos(bRadian)*3.0;
    c = Math.cos(cRadian)*3.0;
    d = Math.cos(dRadian)*3.0;

    aRadian += 0.000003;
    bRadian += 0.000008;
    cRadian += 0.000003;
    dRadian += 0.000008;

    var xn = Math.sin(a*y) + c*Math.cos(a*x);  
    var yn = Math.sin(b*x) + d*Math.cos(b*y);

    x = xn;
    y = yn;

    this.x = x*100 + screenW/2;
    this.y = y*100 + screenH/2;

  },
});

/*
 * メインシーン
 */
var screenW, screenH;
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',

  // 初期化
  init: function() {
    // super init
    this.superInit();

    // 背景色
    this.backgroundColor = '#000';

    screenW = this.gridX.width;
    screenH = this.gridY.width;

    // デフォルトでいくつか生成
    (2000).times(function() {

      this.addCircle(0, 0, 1.4);
      
    }, this);
  },

  // サークルを追加
  addCircle: function(x, y, radius) {
    var color = '#4FF';

    // サークルを生成
    var circle = Circle({
      fill: color,
      x: x,
      y: y,
      radius: radius,
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

  //app.enableStats();

  // 実行
  app.run();
});
