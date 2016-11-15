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

game = new Scrabble();
console.log(game.helloWorld());
console.log(game.score("zzz"));

module.exports = Scrabble;
