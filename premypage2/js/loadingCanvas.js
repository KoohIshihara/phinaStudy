phina.define('LoadingCircle', {
  superClass: 'CircleShape',
  init: function init(options) {
    this.superInit(options);
    // 引数がわたされなかった場合のプロパティ
    options = (options || {}).$safe({
      stroke: null,
      scaleX: 1.0,
      scaleY: 1.0,
    });

    var self = this;
  },// init

  update: function (){
    
  },
});


phina.define('nowLoadScene', {
  superClass: 'DisplayScene',
  init: function init(options) {
    this.superInit(options);

    var self = this;
    
    (1).times(function() {
      // サークルを生成
      var circle = LoadingCircle({
        x: this.gridX.center(),
        y: this.gridY.center(),
        radius: 40,
        fill: null,
        stroke: '#00F',
        strokeWidth: 1,
        scaleX: 1,
        scaleY: 1,
      }).addChildTo(this);
    }, self);
  },// init

  update: function (){

  },
});