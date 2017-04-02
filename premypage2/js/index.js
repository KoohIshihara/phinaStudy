var GLOBAL = {};

GLOBAL.openModal = function(targetModal) {
  $('.overlay').fadeToggle('slow', 'linear');
  var aboutTag = document.getElementsByTagName(targetModal);
  $(aboutTag).toggleClass('active-modal');
  $(aboutTag).fadeToggle('slow', 'linear');
  $('atom-icon-close').css('pointer-events', 'none');
  setTimeout(function(){
    $('atom-icon-close').css('pointer-events', 'auto');
  }, 4600);
}
// aboutReset()とかはphinaで指定してるよ。

GLOBAL.underLoading = false
GLOBAL.choosedSound = false;