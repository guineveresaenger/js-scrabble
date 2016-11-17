var Scrabble = {};

// YOUR CODE HERE
Scrabble.helloWorld = function() {
  return 'hello world!';
};

Scrabble.score = function(word) {
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
      if(key.indexOf(word[i]) >= 0) {
        total += scoreChart[key];
      }
    }
  }
  return total;
};

Scrabble.highestScoreFrom = function(arrayOfWords) {

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
    if (scores[word] == maxScore) {
      potentialWinners.push(word);
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
    totalScore += Scrabble.score(this.plays[i]);
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
  return Scrabble.highestScoreFrom(this.plays);
};

Player.prototype.highestWordScore = function() {
  return Scrabble.score(this.highestScoringWord());
};



var Board = function(){
  this.board = this.newBoard();
};

Board.prototype.newBoard = function() {
  // a Scrabble board is 15x15
  var newBoard = [];
  for (var j = 0; j < 15; j++) {
    var line = [];
    for (var i = 0; i < 15; i++) {
      line.push(null);
    }
    newBoard.push(line);
  }
  return newBoard;
};

Board.prototype.checkAvailability = function(word, startSquare, direction) {
  // check if there's a contiguous amount of null values in each line
  // e.g startSquare [0,0] - top left corner
  // check valid direction input
  if (direction !== "across" && direction !== "down") {
    return "Your word can only be played 'across' or 'down'.";
  }

  if (direction === "across") {
    for (var i = 0; i < word.length; i++) {
      if ((startSquare[1] + i) > 14 || this.board[startSquare[0]][startSquare[1] + i] !== null) {
        return false;
      }
    }
  }
  else if (direction === "down") {
    for (var j = 0; j < word.length; j++) {
      if ((startSquare[0] + j) > 14 || this.board[startSquare[0] + j][startSquare[1]] !== null) {
        return false;
      }
    }
  }
  return true;
};

Board.prototype.playWord = function(word, startSquare, direction) {
  if (this.checkAvailability(word, startSquare, direction) === true){
    if (direction === "across") {
      for (var i = 0; i < word.length; i++) {
        this.board[startSquare[0]][startSquare[1] + i] = word[i];
      }
    }
    else if (direction === "down") {
      for (var j = 0; j < word.length; j++) {
        this.board[startSquare[0] + j][startSquare[1]] = word[j];
      }
    }
  }
  return this.board;
};

module.exports = Scrabble;
