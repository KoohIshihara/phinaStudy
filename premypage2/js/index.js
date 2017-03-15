var GLOBAL = {};

// about~~系全部まとめられそうじゃん。
GLOBAL.aboutModal = function() {
  var aboutTag = document.getElementsByTagName('modal-about');
  $(aboutTag).toggleClass('active-modal');
  $(aboutTag).fadeToggle("slow", "linear");
}

GLOBAL.artModal = function() {
  var aboutTag = document.getElementsByTagName('modal-art');
  $(aboutTag).toggleClass('active-modal');
  $(aboutTag).fadeToggle("slow", "linear");
}

GLOBAL.brandingModal = function() {
  console.log(1);
}

GLOBAL.uiuxModal = function() {
  console.log(1);
}
