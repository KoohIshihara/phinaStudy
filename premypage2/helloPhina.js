phina.globalize();

// アニメーションのステータス
var STATUS = {
  normal: true,
  separation: false,
  bluefocus: false, 
}

phina.define('Circle', {
  superClass: 'CircleShape',

  init: function(options) {
    // 引数がわたされなかった場合のプロパティ
    options = (options || {}).$safe({
      fill: '#00F',
      stroke: null,
      radius: 10,
      scaleX: 1.0,
      scaleY: 1.0,
    });
    this.superInit(options);
    //this.blendMode = 'lighter';
    // STATUS.normalで使うプロパティ---------------
    var speed = Math.random()*2+0.4;
    var angle = Math.randint(0, 360);
    this.vx = Math.cos(angle * (Math.PI / 180)) * speed;
    this.vy = Math.sin(angle * (Math.PI / 180)) * speed;

    this.limitRadius = 200; // 移動できる幅の上限
    this.moveDistance = 100; // 移動した長さ
    //-------------------------------------------
    this.unnormal = true;
  },//init

  update: function() {
    switch(true){
      case STATUS.normal:
        this.normal();
      break;

      case STATUS.separation:
        this.separate();
      break;
    } 
  },// update

  normal: function(){
    this.x += this.vx;
    this.y += this.vy;

    this.moveDistance += Math.sqrt(this.vx*this.vx + this.vy*this.vy);
    if(this.moveDistance > 200){
      this.moveDistance = 0;
      this.vx = -this.vx;
      this.vy = -this.vy;
    }
  },// normal

  separate: function(){
    if(this.unnormal){
      var durationTime = Math.randint(800, 1600)
      this.tweener
      .to({
        x:100,
        y:100,
      },durationTime,"easwInCubic")
      .call(function(){
        STATUS.normal = true;
        STATUS.separate = false;
      });
      this.unnormal = false;
    }
  },// separate
});


phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);
    // 背景色
    this.backgroundColor = '#FFF';

    (30).times(function() {
    // サークルを生成
      var circle = Circle({
        x: this.gridX.width/2,
        y: this.gridY.width/2,
        radius: 10,
      }).addChildTo(this);
    }, this);


  },

  update: function(app) {
    if (app.frame % 4 === 0) {
      
    }
    if (app.frame == 100) {
      STATUS.normal=false;
      STATUS.separation=true;
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
  }
});

