phina.globalize();

var SCREEN_WIDTH, SCREEN_HEIGHT;

var ASSETS = {
  image: {
    'logo': './e-event-prelogo2.png',
  },
};

phina.define('Triangle', {
  superClass: 'TriangleShape',

  init: function(options) {
    options = (options || {}).$safe({
      fill: '#FFF',
      stroke: null,
      radius: 1,
    });
    this.superInit(options);
    // this.blendMode = 'lighter';
    // 初期配置を保持
    this.firstPos = {x:this.x, y:this.y};
    // 色を３通りから決定
    var fillRand = Math.randint(0,4);
    switch(fillRand){
      case 0:
        this.fill = '#ffff9e';
        break;
      case 1:
        this.fill = '#ceff9e';
        break;
      case 2:
        this.fill = '#ffce9e';
        break;
      case 3:
        this.fill = '#ce9eff';
        break;
      case 4 :
        this.fill ='#9eceff';
        break;
    }
    // 移動スピードを決定（大きいものほど早くする）
    this.vx = 5 + this.radius/20;
    // スタートまでの時間差を決定
    this.time = 0;
    this.startTime = Math.randint(0,20);
    this.ableMove = false;
  },

  update: function(app) {
    if(this.ableMove){
      this.x += this.vx;
      this.y -= 1;
    }

    if(this.x > SCREEN_WIDTH+200){
      this.x = this.firstPos.x;
      this.y = this.firstPos.y;
    }

    if (app.frame % 8 === 0) {
      if(this.time<this.startTime){
        this.time++;
      }else{
        this.ableMove = true;
      }
    }
  },
});

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);
    this.backgroundColor = '#d1ffff';

    SCREEN_WIDTH = this.gridX.width;
    SCREEN_HEIGHT = this.gridX.height;

    // 重なり順が正しくなるように三角形を配置
    for(var i=40; i<160; i+=3){
      this.createTriangle(i);
    }

    var logo = Sprite('logo').addChildTo(this);
    logo.x = this.gridX.center()+40;
    logo.y = this.gridY.center();

  },

  update: function(app) {
    if (app.frame % 8 === 0) {
      //this.createTriangle();
      //this.createShape(x,y);
    }
  },//update
  
  createTriangle: function(radius) {
    var x = -200;
    var y = Math.randint(0, this.gridY.width+200);
    //var radius = Math.randint(40, 160);
    var rotation = Math.randint(0, 140);
    var circle = Triangle({
      fill: '#ffff9e',
      x: x,
      y: y,
      radius: radius,
      rotation: rotation,
    });
    circle.alpha = 0.7;

    circle.addChildTo(this);
  },
/*
  addTween: function(shape) {
    shape.tweener
    .to({
      alpha:0.0,
      scaleX:1.0,
      scaleY:1.0,
      rotation: 180,
    },2000,"easwInCubic")
    .call(function(){
      shape.remove();
    });
  },
*/
/*
  createShape: function() {
    
    var x = Math.randint(0, this.gridX.width);
    var y = Math.randint(0, this.gridY.width);
    
    var size = Math.randint(80, 120);
    
    this.createTriangle( x, y, size );
    
  },

  createTriangle: function( x, y, size ) {
    var t = TriangleShape({
      x: x,
      y: y,
      fill: '#F99',
      radius: size,
      stroke: false,
      strokeWidth: 6,
      cornerRadius: 8,
      scaleX: 0.1,
      scaleY: 0.1,
      alpha:0.0,
    }).addChildTo(this);
    this.addTween(t);
  },
  
  addTween: function(shape) {
    shape.tweener
    .to({
      alpha:0.0,
      scaleX:1.0,
      scaleY:1.0,
      rotation: 180,
    },2000,"easwInCubic")
    .call(function(){
      shape.remove();
    });
  },
*/
});

phina.main(function() {
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  var app = GameApp({
    startLabel: 'main',
    width: winW,
    height: winH,
    fit: false,
    assets: ASSETS,
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
    SCREEN_WIDTH = winW;
    SCREEN_HEIGHT = winH;
  }
});

