var Scrabble = function() {};

// YOUR CODE HERE
Scrabble.prototype.helloWorld = function() {
  return 'hello world!';
};

Scrabble.prototype.score = function(word) {
  word = word.toLowerCase();
  var total = 0;
  // var scoreChart = {
  //   1: "aeioulnrst",
  //   2: "dg",
  //   3: "bcmp",
  //   4: "fhvwy",
  //   5: "k",
  //   8: "jx",
  //   10: "qz"
  // };
  for(var i = 0; i < word.length; i++){
    switch(true) {
      case ("aeioulnrst".indexOf(word[i]) >= 0):
        total += 1;
        break;
      case ("dg".indexOf(word[i]) >=0):
        total += 2;
        break;
      case ("bcmp".indexOf(word[i]) >=0):
        total += 3;
        break;
      case ("fhvwy".indexOf(word[i]) >=0):
        total += 4;
        break;
      case ("k".indexOf(word[i]) >=0):
        total += 5;
        break;
      case ("jx".indexOf(word[i]) >=0):
        total += 8;
        break;
      case ("qz".indexOf(word[i]) >=0):
        total += 10;
        break;
      default: {
        return 'Sorry, but this word contains an invalid character.';
      }
    }
  }
  return total;
};


Scrabble.prototype.highestScoreFrom = function(arrayOfWords) {

  console.log("HI HELLO NEW FUNCTION");
  console.log(this.score("jj"));

  var scores = {};

  // Assign scores to each word
  for (var i = 0; i < arrayOfWords.length; i++) {
    scores[arrayOfWords[i]] = this.score(arrayOfWords[i]);
  }
  console.log(scores);
  console.log(Object.values(scores));

  // get largest score regardless of duplicates
  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  var maxScore = getMaxOfArray(Object.values(scores));

  // get all poential winning words
  var potentialWinners = [];

  for (var word in scores) {
    if(scores.hasOwnProperty(word)) {
      console.log("This is the word: " + word + " and the score: " + scores[word]);
      if (scores[word] == maxScore) {
        console.log("A winner is: " + word);
        potentialWinners.push(word);
        console.log(potentialWinners);
      }
    }
  }

  // go through winners array
  if (potentialWinners.length == 1) {
    return potentialWinners[0];
  }
  else {
    for (var j = 0; j < potentialWinners.length; j++) {
      if (potentialWinners[j].length == 7) {
        return potentialWinners[j];
      }
    }
    // TODO: return shortest word!

  }

};

game = new Scrabble();
console.log(game.helloWorld());
// console.log(game.score("zzz"));
game.highestScoreFrom(["zzz", "qqq", "word", "hi"]);

module.exports = Scrabble;
