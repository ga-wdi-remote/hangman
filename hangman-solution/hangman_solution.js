var rls = require('readline-sync');


// Letter Constructor 
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


// Word constructor
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

// game object literal
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
        this.currentWord.getLetters(this.words[randomInteger]);
    },

    guess: function(letter) {
        if (this.guessedLetters.indexOf(letter) === -1) {
            this.currentWord.try(letter);
            this.guessedLetters.push(letter);
            this.guesses--;
        }
    },

    isOver: function() {
        return this.currentWord.isFound() || (this.guesses === 0);
    },

    overMessage: function() {
        if (this.currentWord.isFound()) {
            return 'You win';
        }
        if (this.guesses === 0) {
            return 'You lose';
        }
        return '';
    },

    render: function() {
        console.log('Guesses Left: ' + this.guesses);
        console.log(this.currentWord.render());
    }
};


// Program starts here

var arrayOfWords = ['dog', 'cat'];

// Initialize a game
game.startGame(arrayOfWords);

// Keep asking for user input until game is over
while (!game.isOver()) {
    game.render();
    var letter = rls.question('Guess a letter: ');
    if (letter.length !== 1) {
        console.log('Hmmm...that was not a letter');
    } else {
        game.guess(letter);
    };
    console.log('================');
}

console.log(game.overMessage());
