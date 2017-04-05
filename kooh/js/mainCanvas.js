phina.globalize();

var SCREEN_WIDTH;
var SCREEN_HEIGHT;
var TRIANGLE_POS = {top: 0, left: 0, right: 0};
var SOUND_ON;

var ASEETS = {
  font: {
    'futura': './assets/FuturaBook.ttf',
  },
  sound: {
    'bgm': './assets/bgm.mp3',
  },
};

phina.define('Circle', {
  superClass: 'CircleShape',

  init: function(options) {
    // 引数がわたされなかった場合のプロパティ
    options = (options || {}).$safe({
      stroke: null,
      scaleX: 0.0,
      scaleY: 0.0,
    });
    this.superInit(options);

    var self = this;
    //this.blendMode = 'source-in';
    this.alpha = 0.4;
    this.tweener.to({ scaleX:1.0, scaleY:1.0 },4000,"swing");
    this.status = 'normal';
    this.tweening = false;
    // 玉の移動する直径距離
    this.gatheredDiamerter = 240 + (100-this.radius*10);
    this.separatedDiamerter = 100 + (40-this.radius*6);
    // status.normalで使う------------------------
    this.initNormalStatus(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, this.gatheredDiamerter);
    switch(this.fill){
      case '#F44':
        this.trianglePos = TRIANGLE_POS.top;//{x: center.x + Math.cos(-Math.PI/2)*triangleRadius, y: center.y + Math.sin(-Math.PI/2)*triangleRadius};
      break;
      case '#4F4':
        this.trianglePos = TRIANGLE_POS.left;//{x: center.x + Math.cos(-Math.PI*5/4)*triangleRadius, y: center.y + Math.sin(-Math.PI*5/4)*triangleRadius};
      break;
      case '#44F':
        this.trianglePos = TRIANGLE_POS.right;//{x: center.x + Math.cos(-Math.PI*7/4)*triangleRadius, y: center.y + Math.sin(-Math.PI*7/4)*triangleRadius};
      break;
    }

    this.durationTime = Math.randint(2000, 3600);
    this.initTweeners(this.trianglePos, self);
    
  },//init

  initNormalStatus: function(setX, setY, diameter) {
    this.moveOrigin = {x: setX, y: setY};

    this.diameter = diameter;
    this.diameterAngle = 0;
    this.diameterSpeed = Math.random() + 0.2;

    this.rotationAngle = Math.randint(0,360);
    this.rotationRadius = 0;
    this.x = this.moveOrigin.x;
    this.y = this.moveOrigin.y;
  },

  initTweeners: function(trianglePos, self) {
    this.tweeners = {
      separation: Tweener().to({
        x: trianglePos.x,
        y: trianglePos.y,
      },this.durationTime,"easwInExpo")
      .call(function(){
        self.status = 'normal';
        self.initNormalStatus(trianglePos.x, trianglePos.y, self.gatheredDiamerter);
        self.tweening = false;
      }),
      gathering: Tweener().to({
        x: SCREEN_WIDTH/2,
        y: SCREEN_HEIGHT/2,
      },this.durationTime,"easwInExpo")
      .call(function(){
        self.status = 'normal';
        self.initNormalStatus(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, self.gatheredDiamerter);
        self.tweening = false;
      }),
    }//this.tweeners
  },

  update: function() {
    switch(this.status){
      case 'normal':
        this.normalUpdate();
      break;
      case 'separation':
        this.separateUpdate();
      break;
      case 'gathering':
        this.gatheringUpdate();
      break;
    } 
  },// update

  normalUpdate: function() {
    this.diameterAngle += this.diameterSpeed;
    var moveRadius = Math.sin(this.diameterAngle*(Math.PI / 180))*(this.diameter/2);

    this.rotationAngle += 0.4;
    this.x = this.moveOrigin.x + Math.cos(this.rotationAngle*(Math.PI / 180))*moveRadius;
    this.y = this.moveOrigin.y + Math.sin(this.rotationAngle*(Math.PI / 180))*moveRadius;
  },// normal

  separateUpdate: function() {
    // 一度だけ呼び出す。
    if(!(this.tweening)){
      this.attach(this.tweeners.separation);
      this.initTweeners(this.trianglePos, this);
      this.tweening = true;
    } // if
  },// separate

  gatheringUpdate: function() {
    if(!(this.tweening)){
      this.attach(this.tweeners.gathering);
      this.initTweeners(this.trianglePos, this);
      this.tweening = true;
    }
  },
});

//------------------------------------------------------------------------------------------------

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);
    
    // 三角形の頂点を取得。---------------------------
    var center = {x: SCREEN_WIDTH/2, y: SCREEN_HEIGHT/1.9};
    var trianglePos; // 三角形の頂点の座標
    var triangleRadius = SCREEN_HEIGHT >= SCREEN_WIDTH ? SCREEN_WIDTH/2.5 : SCREEN_HEIGHT/2.5;
    TRIANGLE_POS.top = {x: center.x + Math.cos(-Math.PI/2)*triangleRadius, y: center.y + Math.sin(-Math.PI/2)*triangleRadius};
    TRIANGLE_POS.left = {x: center.x + Math.cos(-Math.PI*5/4)*triangleRadius, y: center.y + Math.sin(-Math.PI*5/4)*triangleRadius};
    TRIANGLE_POS.right = {x: center.x + Math.cos(-Math.PI*7/4)*triangleRadius, y: center.y + Math.sin(-Math.PI*7/4)*triangleRadius};

    var self = this;

    // 背景色
    this.backgroundColor = '#FFF';

    // tweenerの初期化
    this.initTweeners(self);
    // 中心のラベルを配置
    this.label = {};
    this.label.center = Label({
      text: "Hi I am Kooh.",
      x: this.gridX.center(),
      y: this.gridY.center(),
      fontSize: 24,
      fill: '#000000',
      fontFamily: 'futura',
    }).addChildTo(this);
    this.label.center.alpha = 0.0;
    this.label.center.setInteractive(true);  
    this.label.center.attach(this.tweneers.centerInOut);
    //-----------------------------------------------------
    this.isSeparation = true;
    //-----------------------------------------------------
    this.mainSceneFrame = 0;// このシーンがはじまってからのフレーム数
  },

  update: function(app) {

    if(this.mainSceneFrame < 701) this.mainSceneFrame++;

    if (this.mainSceneFrame == 420) {
      var children = this.children;
      for(var i=0; i<children.length; i++){
        children[i].status = 'separation';
      }
    }
    if (this.mainSceneFrame == 630) { // ３つのラベルを生成・フェードイン

      this.setTriangleLabels(this); // 3つのラベルを生成する。

      this.label.art.tweener.to({alpha:1.0},2000);
      this.label.branding.tweener.to({alpha:1.0},2000);
      this.label.uiux.tweener.to({alpha:1.0},2000);

      this.label.center.attach(this.tweneers.fadeIn);
    } // if (app.frame = 700)

    // パーティクル移動中はラベルのインタラクティブを無効に
    /*
    if (app.frame % 10 == 0){
      if(this.isSeparation != true){
        for( key in this.label){
          this.label[key].setInteractive(false);
          console.log(this.label[key].interactive);
        }
      }else{
        for( key in this.label){
          this.label[key].setInteractive(true);
        }
      }
    }
    */

  },// update

  initTweeners: function(self){
    // ラベルのtweenを用意
    this.tweneers = {
      centerInOut: Tweener().to({
         alpha:1.0,
        },2000,"swing")
        .wait(500)
        .call(function(){
          // BGMスタート
          if(SOUND_ON) GLOBAL.playBgm();//SoundManager.playMusic('bgm',600,true);
          // パーティクルを生成するよ。あとで関数化する。
          for(var i=0; i < WORKS_PARAM.length; i++){
            var fill;
            switch(WORKS_PARAM[i].categori){
              case 'Art':
                fill = '#F44';
                break;
              case 'Branding':
                fill = '#4F4';
                break;
              case 'UIUX':
                fill = '#44F';
                break;
            }
            var radius = WORKS_PARAM[i].size;
            var circleL = Circle({
              x: self.gridX.center(),
              y: self.gridY.center(),
              radius: radius,
              fill: fill,
            }).addChildTo(self);
            var circleS = Circle({
              x: self.gridX.center(),
              y: self.gridY.center(),
              radius: radius/2,
              fill: fill,
            }).addChildTo(self);
          }
          // ラベルの重なり順を手前にもってくる。
          var label = self.label.center;
          self.label.center.remove();
          label.addChildTo(self);
          label.tweener
          .wait(8000)
          .to({
           alpha:0.0,
          },2000,"swing")
          .call(function(){
            label.text = 'About Kooh';
          });
      }),

      fadeIn: Tweener().to({
       alpha:1.0,
      },2000,"swing"),

      fadeOut: Tweener().to({
       alpha:0.0,
      },2000,"swing"),
    }
  },

  setCircleStatus: function(color_str){
    var self = this;
    var children = this.children;
    if(this.isSeparation){ // 中心に集める。
      for(var i=0; i<children.length; i++){
        if(color_str=='all' || color_str==children[i].fill){
          children[i].status = 'gathering';
        }else if(children[i].fill!='#000000'){
          var fadeOut = Tweener().to({  alpha:0.0 },2000,"swing");
          children[i].attach(fadeOut);
        }
      }
      for( key in this.label){
        this.label[key].setInteractive(false);
      }
    }else{ // 三角に散らす。
      for(var i=0; i<children.length; i++){
        if(color_str=='all' || color_str==children[i].fill){
          children[i].status = 'separation';
        }else if(children[i].fill!='#000000'){ // 文字列以外のオブジェクトの時
          var fadeIn = Tweener().to({  alpha:0.4 },2000,"swing");
          children[i].attach(fadeIn);
        }
      }
      setTimeout(function(){
        for( key in self.label){
          self.label[key].setInteractive(true);
        }
      }, 3600);
    }
    this.isSeparation = !(this.isSeparation);
  },

  setTriangleLabels: function(self){

    this.label.center.onpointstart = function(e) {
      self.labelToggle('Center'); // ラベルのフェードアウト
      self.setCircleStatus('all'); // 玉の移動
      GLOBAL.openModal('modal-about'); // モーダル出現
    }
    GLOBAL.aboutReset = function(){
      self.labelToggle('Center'); // ラベルのフェードアウト
      self.setCircleStatus('all'); // 玉の移動
    }


    var art = Label({
      text: "Art",
      x: TRIANGLE_POS.top.x,
      y: TRIANGLE_POS.top.y,
      fontSize: 20,
      fill: '#000000',
      /*fontFamily: 'futura',*/
    }).addChildTo(this);
    art.alpha = 0.0;
    art.setInteractive(true);
    art.onpointstart = function(e) {
      self.labelToggle('Art');
      self.setCircleStatus('#F44');
      GLOBAL.openModal('modal-art');
    };
    GLOBAL.artReset = function(){
      self.labelToggle('Art');
      self.setCircleStatus('#F44');
    }
    this.label.art = art;


    var branding = Label({
      text: "Branding",
      x: TRIANGLE_POS.left.x,
      y: TRIANGLE_POS.left.y,
      fontSize: 20,
      fill: '#000000',
      /*fontFamily: 'futura',*/
    }).addChildTo(this);
    branding.alpha = 0.0;
    branding.setInteractive(true);
    branding.onpointstart = function(e) {
      self.labelToggle('Branding');
      self.setCircleStatus('#4F4');
      GLOBAL.openModal('modal-branding');
    };
    GLOBAL.brandingReset = function(){
      self.labelToggle('Branding');
      self.setCircleStatus('#4F4');
    }
    this.label.branding = branding;


    var uiux = Label({
      text: "UI・UX",
      x: TRIANGLE_POS.right.x,
      y: TRIANGLE_POS.right.y,
      fontSize: 20,
      fill: '#000000',
      /*fontFamily: 'futura',*/
    }).addChildTo(this);
    uiux.alpha = 0.0;
    uiux.setInteractive(true);
    uiux.onpointstart = function(e) {
      self.labelToggle('UI・UX');
      self.setCircleStatus('#44F');
      GLOBAL.openModal('modal-uiux');
    };
    GLOBAL.uiuxReset = function(){
      self.labelToggle('UI・UX');
      self.setCircleStatus('#44F');
    }
    this.label.uiux = uiux;
  }, // setTriangleLabels

  labelToggle: function(touchedLabel_str){
    
    var labels = this.label;
    if(touchedLabel_str=='Center'){ // centerが押された場合
      for(key in labels){
        if(key!='center'){
          if(labels[key].alpha==0.0){
            var fadeIn = Tweener().wait(2800).to({  alpha:1.0 },2000,"swing");
            labels[key].attach(fadeIn);
          }else{
            var fadeOut = Tweener().wait(2800).to({  alpha:0.0 },2000,"swing");
            labels[key].attach(fadeOut);
          }
        }
      }
    }else{ // center以外が押された場合
      for(key in labels){
        if(key!='center'){ // center以外はfadeIn or Out
          if(labels[key].alpha==0.0){
            var fadeIn = Tweener().wait(2800).to({  alpha:1.0 },2000,"swing");
            labels[key].attach(fadeIn);
          }else{
            var fadeOut = Tweener().wait(2800).to({  alpha:0.0 },2000,"swing");
            labels[key].attach(fadeOut);
          }
        }else{ // centerのアニメーション
          if(labels['art'].alpha==0.0){ // gatherしてる時
            var tween = Tweener().to({
             alpha:0.0,
            },1000,"swing")
            .call(function(){
              labels['center'].text = 'About Kooh';
            })
            .to({
             alpha:1.0,
            },1000,"swing");
            labels[key].attach(tween);
          }else{ // separateしてる時
            var tween = Tweener().to({
             alpha:0.0,
            },1000,"swing")
            .call(function(){
              labels['center'].text = touchedLabel_str;
            })
            .to({
             alpha:1.0,
            },1000,"swing");
            labels[key].attach(tween);
          }
        } // else
      }// for in
    }

  },

}); //mainScene

phina.define('TitleScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);

    SCREEN_WIDTH = this.gridX.width;
    SCREEN_HEIGHT = this.gridY.width;

    GLOBAL.closeLoading();

  },// init

  update: function(){
    if(GLOBAL.compLoading && GLOBAL.choosedSound) this.exit();
  },
});




//----canvas.js-----//