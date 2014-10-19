const natural = require('natural');

var tokenizer = new natural.WordTokenizer();

module.exports = {
  check: function ( triggerPhrase, tokens ) {
    var newTokens = tokenizer.tokenize( triggerPhrase );
    var numTokens = newTokens.length;

    for (i = 0; i < numTokens; i++) {
        if (newTokens.indexOf(i) != tokens.indexOf(i)) {
            return false;
        }
    }

    return true;
  }
};

// private functions
