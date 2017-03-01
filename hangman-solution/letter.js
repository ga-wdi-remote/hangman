function Letter(value) {
  this.value = value;
  this.hidden = true;

  this.hide = function() {
    this.hidden = true;
  };

  this.show = function() {
      this.hidden = false;
  };

  this.render = function() {
    if (this.hidden){
      return '_';
    } else {
      return this.value;
    };    
  }
};

var someLetter = new Letter('l');
var someOtherLetter = new Letter('k');
