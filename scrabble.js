var Scrabble = function() {};

// YOUR CODE HERE
Scrabble.prototype.helloWorld = function() {
  return 'hello world!';
};

Scrabble.prototype.score = function(word) {
  word = word.toLowerCase();
  var total = 0;
  var scoreChart = {
    "aeioulnrst": 1,
    "dg": 2,
    "bcmp": 3,
    "fhvwy": 4,
    "k": 5,
    "jx": 8,
    "qz": 10
  };

  // Loop over each letter in word, checking against each score key
  for(var i = 0; i < word.length; i++){
    for (var key in scoreChart) {
      if(scoreChart.hasOwnProperty(key)) {
        if(key.indexOf(word[i]) >= 0) {
          total += scoreChart[key];
        }
      }
    }
  }
  return total;
};

Scrabble.prototype.highestScoreFrom = function(arrayOfWords) {

  var scores = {};

  // Assign scores to each word
  for (var i = 0; i < arrayOfWords.length; i++) {
    scores[arrayOfWords[i]] = this.score(arrayOfWords[i]);
  }

  // get largest score regardless of duplicates
  var maxScore = Math.max.apply(null, Object.values(scores));

  // get all words with the largest score
  var potentialWinners = [];
  for (var word in scores) {
    if(scores.hasOwnProperty(word)) {
      if (scores[word] == maxScore) {
        potentialWinners.push(word);
      }
    }
  }

  // go through winners array
  if (potentialWinners.length == 1) {
    return potentialWinners[0];
  }
  else {
    // return seven-letter word if there is one (we assume there's only one...)
    console.log(potentialWinners);
    for (var j = 0; j < potentialWinners.length; j++) {
      console.log(potentialWinners[j].length);
      if (potentialWinners[j].length === 7) {
        return potentialWinners[j];
      }
    }
    // return shortest word
    var min = potentialWinners[0].length;
    var highestWord = potentialWinners[0];
    for (var k = 0; k < potentialWinners.length; k ++) {

      if(min > potentialWinners[k].length) {
        min = potentialWinners[k].length;
        highestWord = potentialWinners[k];
      }
    }
    return highestWord;
  }

};

var Player = function(name) {
  this.name = name;
  this.plays = [];
  this.game = new Scrabble();
};

Player.prototype.helloWorld = function () {
  return "Hi I'm playing Scrabble.";
};

Player.prototype.play = function(word) {
  if (this.hasWon() === true) {
    return false;
  }
  else {
    return this.plays.push(word);
  }
};

Player.prototype.totalScore = function() {
  // score all words in plays
  var totalScore = 0;
  for (var i = 0; i < this.plays.length; i ++) {
    totalScore += this.game.score(this.plays[i]);
  }
  return totalScore;

};

Player.prototype.hasWon = function() {
  console.log("Here is the total score: " + this.totalScore());
  if (this.totalScore() >= 100) {
    return true;
  }
  else {
    return false;
  }
};

Player.prototype.highestScoringWord = function() {
  return this.game.highestScoreFrom(this.plays);
};

Player.prototype.highestWordScore = function() {
  return this.game.score(this.highestScoringWord());
};



var Board = function(){
  this.board = this.newBoard();
};

Board.prototype.newBoard = function() {
  // a Scrabble board is 15x15
  var newBoard = [];
  var line = [];
  for (var i = 0; i < 15; i++) {
    line.push(null);
  }
  for (var j = 0; j < 15; j++) {
    newBoard.push(line);
  }
  return newBoard;
};

Board.prototype.checkAvailability = function(word, startSquare, direction) {
  var wordLength = word.length;
  // check if there's a contiguous amount of null values in each line
  // e.g startSquare [0,0] - top left corner
  // with direction "across" TODO: check valid direction
  if (direction === "across") {
    for (var i = 0; i < wordLength; i++) {
      if ( this.board[startSquare[0]][startSquare[1] + i] !== null) {
        return false;
      }
    }
  }
  else if (direction === "down") {
    for (var j = 0; j < wordLength; j++) {
      if ((startSquare[0] + j) > 14 || this.board[startSquare[0] + j][startSquare[1]] !== null) {
        return false;
      }
    }
  }
  return true;
};

b = new Board();
b.newBoard();
console.log(b.checkAvailability("hello", [11,0], "down"));




// game = new Scrabble();
// console.log(game.helloWorld());
// console.log(game.highestScoreFrom(["a", "b"]));

// console.log(game.highestScoreFrom(["xxxbb", "kkkkkkk", "zzz", "qqq", "word", "hi"]));

// player = new Player("Guin");
// console.log(player.helloWorld());
// console.log(player.name);
// console.log(player.plays);
// player.play("Hello");
// console.log(player.game.score("Hello"));
// console.log(player.plays);
// player.play("Elefant");
// console.log(player.game.score("Elefant"));
// console.log(player.plays);
// player.play("zzz");
// console.log(player.game.score("zzz"));
// console.log(player.plays);
// console.log(player.totalScore());
// console.log(player.hasWon());
// console.log("******************");
// player.play("zzz");
// console.log(player.plays);
// console.log(player.totalScore());
// console.log(player.hasWon());
// console.log("******************");
// player.play("zzz");
// console.log(player.plays);
// console.log(player.totalScore());
// console.log(player.hasWon());
// console.log("******************");
// player.play("zzz");
// console.log(player.plays);
// console.log(player.totalScore());
// console.log(player.hasWon());
// console.log(player.highestScoringWord());
// console.log(player.highestWordScore());


module.exports = Scrabble;
