phina.globalize();

phina.define('MainScene', {
  superClass: 'CanvasScene',
  
  init: function init() {
    this.superInit();

    // 四角形を表示
    var star = StarShape().addChildTo(this);
    star.x = 320;
    star.y = 480;
    
    // 移動速度
    star.vx = 8;
    
    // 更新関数を登録
    star.update = function() {
      // 移動
      this.x += this.vx;
      
      // 画面外に出ないように制御
      if (this.left < 0) {
        this.left = 0;
        this.vx*=-1;
      }
      else if (this.right > 640) {
        this.right = 640;
        this.vx*=-1;
      }
    }
  },// init
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
  });
  
  app.run();
});
