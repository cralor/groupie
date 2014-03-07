const GROUPMETOKEN = process.env['GROUPMETOKEN'];
const GIPHYTOKEN = process.env['GIPHYTOKEN'];
const GROUP = process.env['GROUP'];
const URL = process.env['URL'];
const natural = require('natural');
const _ = require('underscore');
const util = require('util');
const request = require('request');
const image = require('google-images');
const wundernode = require('wundernode');
var tokenizer = new natural.WordTokenizer();

var config =  { token:GROUPMETOKEN,
                name: "groupie",
                group: GROUP,
                url: URL
              };

const AVATAR = process.env['AVATAR'];
if (AVATAR) {
  config.avatar_url = AVATAR;
}

var giphy = require('giphy-wrapper')(GIPHYTOKEN);
var bot = require('fancy-groupme-bot')(config);
var weather = new wundernode('011c63a4287d7b7d', false, 10, 'minute');


bot.on('botRegistered', function() {
  console.log("online");
});

bot.on('botMessage', function(bot, message) {
  console.log('incoming');
  if (message.name != 'groupie' && message.name != 'Marcus') {
    var tokens = tokenizer.tokenize(message.text);

    tokens = _.map(tokens, function(t) { return t.toLowerCase(); });

    if ((tokens.indexOf('groupie') == 0) || (tokens.indexOf('g') == 0)) {
      if ((tokens.indexOf('gif') == 1) && (tokens.indexOf('me') == 2)) {
        tokens = _.without(tokens, 'groupie', 'g', 'gif', 'me');
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
        tokens = _.without(tokens, 'groupie', 'g', 'what', 'is');
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
          tokens = _.without(tokens, 'groupie', 'g', 'image', 'me');
          searchTerm = escape(tokens.join('+'))
          image.search(searchTerm,function(err,images){
            bot.message(images[0].url);
          })
      } else if ((tokens.indexOf('weather') == 1)) {
        tokens = _.without(tokens, 'groupie', 'g', 'weather');
        searchTerm = esccape(tokens.join('+'))
        weather.forecast(searchTerm, function(err, obj) {
          bot.message(obj.forecast.txt_forecast.forecastday[0].fcttext);
        })
      } else {
        bot.message("What?")
      }
    }
  }
});

bot.serve(process.env['PORT'] || 3000);
