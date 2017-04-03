// BGM再生用
window.AudioContext = window.AudioContext || window.webkitAudioContext;  
var context = new AudioContext();

// Audio 用の buffer を読み込む
var getAudioBuffer = function(url, fn) {  
  var req = new XMLHttpRequest();
  // array buffer を指定
  req.responseType = 'arraybuffer';

  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 0 || req.status === 200) {
        // array buffer を audio buffer に変換
        context.decodeAudioData(req.response, function(buffer) {
          // コールバックを実行
          fn(buffer);
        });
      }
    }
  };

  req.open('GET', url, true);
  req.send('');
};

// サウンドを再生
var playSound = function(buffer) {  
  // source を作成
  var source = context.createBufferSource();
  // buffer をセット
  source.buffer = buffer;
  source.loop = true;
  // context に connect
  source.connect(context.destination);
  // 再生
  source.start(0);
};

// main
window.onload = function() {  
  // サウンドを読み込む
  getAudioBuffer('./assets/bgm.mp3', function(buffer) {
    /*
    // 読み込み完了後にボタンにクリックイベントを登録
    var btn = document.getElementById('btn');
    btn.onclick = function() {
      // サウンドを再生
      playSound(buffer);
    };
    var test = document.getElementById('test');
    test.onclick = function() {
      setTimeout(function(){
        playSound(buffer);
      }, 1000);
    }
    */
    var letSound = document.getElementById('letSound');
    letSound.onclick = function() {
      $('.which').text('OK!');
      $('.sound-off').animate({opacity: 0.0}, 1000);
      $('overlay-choose').delay(1000).fadeToggle('slow', 'linear');
      setTimeout(function(){
        playSound(buffer);
      }, 850);
      
      setTimeout(function(){
        GLOBAL.choosedSound = true;
      }, 2000);
      /*
      setTimeout(function(){
        playSound(buffer);
      }, 4600);
      */
    }

    GLOBAL.playBgm = function(){
      // サウンドを再生
      playSound(buffer);
    }
  });
};



