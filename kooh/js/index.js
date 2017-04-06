var GLOBAL = {};

GLOBAL.openModal = function(targetModal) {
  $('.overlay').fadeToggle('slow', 'linear');
  var tag = document.getElementsByTagName(targetModal);
  $(tag).toggleClass('active-modal');
  $(tag).fadeToggle('slow', 'linear');
  $('atom-icon-close').css('pointer-events', 'none');
  GLOBAL.overlayInteractive = false;
  setTimeout(function(){
    $('atom-icon-close').css('pointer-events', 'auto');
    GLOBAL.overlayInteractive = true;
  }, 4800);
}
// aboutReset()とかはphinaで指定してるよ。

GLOBAL.overlayInteractive = true;

GLOBAL.compLoading = false
GLOBAL.choosedSound = false;

GLOBAL.closeLoading = function() {
  var overlay = $('overlay-loading');
  overlay.fadeToggle();
  GLOBAL.compLoading = true;
}

GLOBAL.closeSound = function() {
  var overlay = $('overlay-choose');
  overlay.fadeToggle();
  GLOBAL.choosedSound = true;
}