function letter(value){
  var letterObject = {
    value: value,
    hidden: true,
    hide: function(){
      letterObject.hidden = true;
    },
    show: function() {
      letterObject.hidden = false;
    }
  };

  return letterObject;
}

var letterK = letter('k');
