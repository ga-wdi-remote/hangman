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
  };
};


function Word(){
    this.letters = [];

    this.getLetters = function(newWord) {
        var letters = newWord.split('');
        for (var i = 0, length = letters.length; i < length; i++) {
            var letterObject = new Letter(letters[i]);
            this.letters.push(letterObject);
        }
    };

    this.isFound = function() {
        for (var i = 0, length = this.letters.length; i < length; i++) {
            if (this.letters[i].hidden) {
                return false;
            }
        }
        return true;
    };

    this.try = function(letter) {
        var found = false;
        for (var i = 0, length = this.letters.length; i < length; i++) {
            if (this.letters[i].value === letter) {
                this.letters[i].show();
                found = true;
            }
        }
        return found;
    };

    this.render = function() {
        var rendered = '';
        for (var i = 0, length = this.letters.length; i < length; i++) {
            rendered += this.letters[i].render();
        }
        return rendered;
    };
};

var game = {
    guesses: 0,
    guessedLetters: [],
    words: [],
    currentWord: '',
    
    startGame: function(wordsArray) {
        this.guesses = 10;
        this.guessedLetters = [];
        this.words = [];
        this.words = wordsArray;
        var randomInteger = Math.floor(Math.random() * (this.words.length));
        this.currentWord = new Word();
        this.currendWord.getLetters(this.words[randomInteger]);
    }
}

