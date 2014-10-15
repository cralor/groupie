const GROUPMETOKEN = process.env['GROUPMETOKEN'];
const GIPHYTOKEN = process.env['GIPHYTOKEN'];
const GROUP = process.env['GROUP'];
const URL = process.env['URL'];
const natural = require('natural');
const _ = require('underscore');
const util = require('util');
const request = require('request');
const image = require('google-images');
//const chuck = require('chuck');

var tokenizer = new natural.WordTokenizer();

var config =  { token:GROUPMETOKEN,
                name: "Felicia",
                group: GROUP,
                url: URL
              };

const AVATAR = process.env['AVATAR'];
if (AVATAR) {
  config.avatar_url = AVATAR;
}

var giphy = require('giphy-wrapper')(GIPHYTOKEN);
var bot = require('fancy-groupme-bot')(config);
//var jokes = chuck();

bot.on('botRegistered', function() {
  console.log("online");
});

bot.on('botMessage', function(bot, message) {
  console.log('incoming');
  var tokens = tokenizer.tokenize(message.text);

  tokens = _.map(tokens, function(t) { return t.toLowerCase(); });

  if (tokens.indexOf('felicia') == 0) {
    if ((tokens.indexOf('gif') == 1) && (tokens.indexOf('me') == 2)) {
      tokens = _.without(tokens, 'felicia', 'gif', 'me');
      console.log("searching for " + tokens);
      giphy.search(escape(tokens.join('+')), 20, 0, function(err, data) {
        if (err) console.error(err);
        console.log("giphy returned " + util.inspect(data));
        if (data.data.length) {
          data = _.shuffle(data.data);
          var id = data[0].id;
          var imageUrl = "http://media3.giphy.com/media/" + id + "/giphy.gif";
          console.log("sending a message " + imageUrl);
          bot.message(imageUrl);
        } else {
          bot.message("Sorry couldn't find anything!")
        }
      });
    } else if ((tokens.indexOf('what') == 1) && (tokens.indexOf('is') == 2)) {
      tokens = _.without(tokens, 'felicia', 'what', 'is');
      searchTerm = escape(tokens.join('+'))
      request('http://api.urbandictionary.com/v0/define?term=' + searchTerm, function(error, response, body){
        resultJSON = JSON.parse(body)
        if(resultJSON["result_type"] == "no_results") {
          bot.message("I don't know what that is.");
        } else {
          firstDefinition = resultJSON["list"][0]["definition"]
          bot.message(firstDefinition);
        }
      })
    } else if ((tokens.indexOf('image') == 1) && (tokens.indexOf('me') == 2)) {
        tokens = _.without(tokens, 'felicia', 'image', 'me');
        searchTerm = escape(tokens.join('+'))
        image.search(searchTerm,function(err,images){
          bot.message(images[0].url);
        })
    } else if ((tokens.indexOf('spotify') == 1) && (tokens.indexOf('me') == 2)) {
        tokens = _.without(tokens, 'felicia', 'spotify', 'me');
        searchTerm = escape(tokens.join('+'));
        var results, linkEnd;
        request('http://ws.spotify.com/search/1/track.json?q=' + searchTerm, function(err, resp, body){
          results = eval("(" + body + ')');
          linkEnd = results["tracks"][0].href.replace('spotify:track:','');
          bot.message("http://open.spotify.com/track/" + linkEnd);
        })
    } else if ((tokens.indexOf('lunch') == 1) && (tokens.indexOf('me') == 2)) {
        var preText = ['Get yourself some', 'Try some', 'Why not some', 'How about', 'Try']
        var lunchOptions = ['salad', 'pizza', 'sushi', 'liquid lunch', 'cheesesteaks', 'food cart', 'halal', 'korean', 'mexican', 'chinese', 'vietnamese']
        bot.message(preText[Math.floor(Math.random() * preText.length)] + " " + lunchOptions[Math.floor(Math.random() * lunchOptions.length)] + "!");
    } else if ((tokens.indexOf('tell') == 1) && (tokens.indexOf('me') == 2) && (tokens.indexOf('a') == 3) && (tokens.indexOf('joke') == 4)) {
        /*jokes.random(function(err, joke) {
            bot.message(joke);
        })*/
        bot.message("You're silly.");
    } else if ((tokens.indexOf('calories') == 1)) {
    		tokens = _.without(tokens, 'felicia', 'calories');
    		humanSearchTerm = tokens.join(' ');
    		searchTerm = escape(tokens.join('+'));
    		request('https://api.nutritionix.com/v1_1/search/' + searchTerm + '?results=0%3A1&cal_min=0&cal_max=5000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=5acc25fb&appKey=056e335168bb29dd99fe206141ff84cc', function(err, resp, body){
    			json = eval("(" + body + ')');
    			cals = json.hits[0].fields.nf_calories
    			bot.message("A " + humanSearchTerm + " is " + cals + " calories.")
    		});
    } else if (tokens.indexOf('weagle') == 1) {
        bot.message("weagle weagle WAR DAMN EAGLE!!!!");
    } else if ((tokens.indexOf('do') == 1) && (tokens.indexOf('you') == 2) && (tokens.indexOf('love') == 3) && (tokens.indexOf('me') == 4)) {
        bot.message("Yes I do, " + message.name + ". You are my " + ((message.name == "InfoKim") ? "creator.":"friend!"));
    } else if (tokens.indexOf('help') == 1) {
        bot.message("Here ya go: gif me, lunch me, tell me a joke, calories, spotify me, image me, what is")
  	} else {
      bot.message("Thank you.")
    }
  }
});

bot.serve(process.env['PORT'] || 3000);
