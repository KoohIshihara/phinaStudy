phina.globalize();

var SCREEN_WIDTH;
var SCREEN_HEIGHT;

phina.define('Circle', {
  superClass: 'CircleShape',

  init: function(options) {
    // 引数がわたされなかった場合のプロパティ
    options = (options || {}).$safe({
      stroke: null,
      radius: 10,
      scaleX: 1.0,
      scaleY: 1.0,
    });
    this.superInit(options);
    //this.blendMode = 'lighter';
    this.alpha = 0.4;
    this.status = 'normal';
    // STATUS.normalで使うプロパティ---------------
    var speed = Math.random()*2+0.4;
    var angle = Math.randint(0, 360);
    this.vx = Math.cos(angle * (Math.PI / 180)) * speed;
    this.vy = Math.sin(angle * (Math.PI / 180)) * speed;

    this.limitRadius = 200; // 移動できる幅の上限 小さい玉ほど端っこまで移動した方が綺麗かも（アイディア）
    this.moveDistance = this.limitRadius/2; // 移動した長さ
    // this.accelとかつけてピアノの響きで加速したりするといいかも（アイディア）
    //-------------------------------------------
    this.tweening = false;
  },//init

  update: function() {
    switch(this.status){
      case 'normal':
        this.normalUpdate();
      break;
      case 'separation':
        this.separateUpdate();
      break;
    } 
  },// update

  normalUpdate: function(){
    this.x += this.vx;
    this.y += this.vy;

    this.moveDistance += Math.sqrt(this.vx*this.vx + this.vy*this.vy);
    if(this.moveDistance > this.limitRadius){
      this.moveDistance = 0;
      this.vx = -this.vx;
      this.vy = -this.vy;
    }
  },// normal

  separateUpdate: function(){
    // 一度だけ呼び出す。
    if(!(this.tweening)){

      // 移動先を決定する。
      var toPos;
      switch(this.fill){
        case '#F00':
          toPos = {x:SCREEN_WIDTH/2, y:SCREEN_HEIGHT/3};
        break;
        case '#0F0':
          toPos = {x:SCREEN_WIDTH/4, y:SCREEN_HEIGHT*2/3};
        break;
        case '#00F':
          toPos = {x:SCREEN_WIDTH*3/4, y:SCREEN_HEIGHT*2/3};
        break;
      } 

      var self = this;
      var durationTime = Math.randint(800, 1600)
      this.tweener
      .to({
        x: toPos.x,
        y: toPos.y,
      },durationTime,"easwInCubic")
      .call(function(){
        self.status = 'normal';
        self.tweening = false;
        self.limitRadius = 80;
      });
      this.tweening = true;
    } // if
  },// separate
});


phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);

    SCREEN_WIDTH = this.gridX.width;
    SCREEN_HEIGHT = this.gridY.width;

    // 背景色
    this.backgroundColor = '#FFF';

    (30).times(function() {
      var random = Math.randint(1,3);
      var fill;
      if(random==1){
        fill='#F00';
      }else if(random==2){
        fill='#0F0';
      }else{
        fill='#00F';
      }
      var radius = Math.random()*20+8;
      // サークルを生成
      var circle = Circle({
        x: this.gridX.width/2,
        y: this.gridY.width/2,
        radius: radius,
        fill: fill,
      }).addChildTo(this);
    }, this);


  },

  update: function(app) {
    if (app.frame == 200) {
      var children = this.children;
      for(var i=0; i<children.length; i++){
        children[i].status = 'separation';
      }
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
    query: '#particlesCanvas',
  });
  app.enableStats();
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
    SCREEN_WIDTH = winW;
    SCREEN_HEIGHT = winH;
  }
});

