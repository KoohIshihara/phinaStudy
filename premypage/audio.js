/*
 * main.js
 */

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

// analyserつくる
var analyser = context.createAnalyser();
analyser.fftSize = 128;
analyser.connect(context.destination);

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

// スペクトラムを取得
function getSpectrums(){
  var spectrums = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(spectrums);
  for(var i=0; i<spectrums.length; i++){
    GLOBAL.spectrumsArray[i] = spectrums[i];
  }
}

// サウンドを再生
var playSound = function(buffer) {
  // source を作成
  var source = context.createBufferSource();
  // buffer をセット
  source.buffer = buffer;
  // context に connect
  source.connect(analyser);
  // 再生
  source.start(0);
  getSpectrums();
  var interval_id = setInterval(getSpectrums , 20);
};

// main
window.onload = function() {
  // サウンドを読み込む
  getAudioBuffer('./Gameshow.mp3', function(buffer) {
    // 読み込み完了後にボタンにクリックイベントを登録
    var btn = document.getElementById('btn');
    btn.onclick = function() {
      // サウンドを再生
      playSound(buffer);
    };
  });
};