const GROUPMETOKEN = process.env['GROUPMETOKEN'];
const GIPHYTOKEN = process.env['GIPHYTOKEN'];
const GROUP = process.env['GROUP'];
const URL = process.env['URL'];
const natural = require('natural');
const _ = require('underscore');
const util = require('util');
const request = require('request');
const image = require('google-images');
const helper = require('./helper.js');
const forecastio = require('forecastio')

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
var google_geocoding = require('google-geocoding');
var fio = new forecastio(process.env['FORECASTIO']);

bot.on('botRegistered', function() {
  console.log("online");
});

bot.on('botMessage', function(bot, message) {
  console.log('incoming');
  var tokens = tokenizer.tokenize(message.text);

  tokens = _.map(tokens, function(t) { return t.toLowerCase(); });

    if (tokens.indexOf('felicia') == 0) {

        if (helper.check( "felicia gif me", tokens )) {
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
      } else if (helper.check( "felicia what is", tokens )) {
          tokens = _.without(tokens, 'felicia', 'what', 'is');
          searchTerm = escape(tokens.join('+'))

          request('http://api.urbandictionary.com/v0/define?term=' + searchTerm, function(error, response, body){
            resultJSON = JSON.parse(body)
            if(resultJSON["result_type"] == "no_results") {
              bot.message("I don't know what that is.");
            } else {
              firstDefinition = resultJSON["list"][0]["definition"]

              if (firstDefinition.length > 450) {
                  firstDefinition = firstDefinition.substring(0, 439) + " (cont) ...";
              }

              bot.message(firstDefinition);
            }
          });
      } else if (helper.check( "felicia image me", tokens )) {
            tokens = _.without(tokens, 'felicia', 'image', 'me');
            searchTerm = escape(tokens.join('+'))

            image.search(searchTerm,function(err,images) {
              bot.message(images[0].url);
            })
        } else if (helper.check( "felicia spotify me", tokens )) {
            tokens = _.without(tokens, 'felicia', 'spotify', 'me');
            searchTerm = escape(tokens.join('+'));
            var results, linkEnd;

            request('http://ws.spotify.com/search/1/track.json?q=' + searchTerm, function(err, resp, body){
              results = eval("(" + body + ')');
              linkEnd = results["tracks"][0].href.replace('spotify:track:','');
              bot.message("http://open.spotify.com/track/" + linkEnd);
            })
        } else if (helper.check( "felicia lunch me", tokens )) {
            var preText = ['Get yourself some', 'Try some', 'Why not some', 'How about', 'Try']
            var lunchOptions = ['salad', 'pizza', 'sushi', 'liquid lunch', 'cheesesteaks', 'food cart', 'halal', 'korean', 'mexican', 'chinese', 'vietnamese']
            bot.message(preText[Math.floor(Math.random() * preText.length)] + " " + lunchOptions[Math.floor(Math.random() * lunchOptions.length)] + "!");
        } else if (helper.check( "felicia tell me a joke", tokens )) {
            /*jokes.random(function(err, joke) {
                bot.message(joke);
            })*/
            bot.message("You're silly.");
        } else if (helper.check( "felicia calories", tokens )) {
    		tokens = _.without(tokens, 'felicia', 'calories');
    		humanSearchTerm = tokens.join(' ');
    		searchTerm = escape(tokens.join('+'));

    		request('https://api.nutritionix.com/v1_1/search/' + searchTerm + '?results=0%3A1&cal_min=0&cal_max=5000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=5acc25fb&appKey=056e335168bb29dd99fe206141ff84cc', function(err, resp, body){
    			json = eval("(" + body + ')');
    			cals = json.hits[0].fields.nf_calories
    			bot.message("A " + humanSearchTerm + " is " + cals + " calories.")
    		});
        } else if (helper.check( "felicia weagle", tokens )) {
            bot.message("weagle weagle WAR DAMN EAGLE!!!!");
        } else if (helper.check( "felicia do you love me", tokens )) {
            bot.message("Yes I do, " + message.name + ". You are my " + ((message.name == "InfoKim") ? "creator.":"friend!"));
        } else if (helper.check( "felicia metar me", tokens )) {
            tokens = _.without(tokens, 'felicia', 'metar', 'me');
            searchTerm = tokens[0].toUpperCase();

            request('http://weather.noaa.gov/pub/data/observations/metar/stations/' + searchTerm + '.TXT', function(err, resp, body){
                if (!err && resp.statusCode == 200) {
                    bot.message( body );
                } else {
                    bot.message( "Sorry, that is an invalid airport code." )
                }
            });
        } else if (helper.check( "felicia who is the mayor of titty city", tokens )) {
            if ( message.name == "KIM of Support" ) {
                bot.message("YOU are the mayor!!!");
            } else {
                bot.message("You are not the mayor...");
            }
        } else if (helper.check( "felicia help me", tokens )) {
            bot.message("Here ya go: gif me, lunch me, tell me a joke, calories, spotify me, image me, what is, help me")
        } else if (helper.check( "felicia say", tokens )) {
            msg = message.text.split(" ");
            msg = _.without(msg, 'felicia', 'say');
            bot.message(msg.join(" "));
        } else if (helper.check( "felicia weather me", tokens )) {
            tokens = _.without(tokens, 'felicia', 'weather', 'me');
            searchLoc = tokens.join(" ");
            console.log("loc: " + searchLoc);

            google_geocoding.geocode(searchLoc, function(geoErr, location) {
                if ( geoErr ) {
                    bot.message("Well, that was an error...")
                } else if ( !location ) {
                    bot.message("I couldn't find that, sorry!")
                } else {
                    var options = {
                        exclude: 'latitude,longitude,timezone,offset,minutely,hourly,flags'
                    };

                    fio.forecast(location.lat, location.lng, options, function(fioErr, data) {
                        if (fioErr) {
                            bot.message("Forecast not found?");
                        } else {
                            response = JSON.stringify(data,null, 2);
                            console.log(response);

                            current_weather = data.currently.summary;
                            precip_type = "no precipitation";
                            current_temp = data.currently.apparentTemperature;
                            wind_speed = data.currently.windSpeed;
                            wind_bearing = data.currently.windBearing;
                            clouds = data.currently.cloudCover;
                            current_vis = data.currently.visibility;
                            accumulation = "0";

                            // Precipitation types
                            if (data.currently.precipIntensity > 0) {
                                precip_type = data.currently.precipType;
                            }

                            // Accumulation of snow
                            if (data.daily.precipIntensity > 0) {
                                accumulation = data.daily.precipAccumulation;
                            }


                            response = "\"" + current_weather + "\"";
                            response += " in \"" + searchLoc + "\"";
                            response += " and " + current_temp + " degrees.\n";
                            response += "The wind is currently " + wind_speed;
                            response += "mph bearing " + wind_bearing + "\n";

                            if (clouds >= 1) {
                                clouds = "Overcast";
                            } else if (clouds >= 0.75) {
                                clouds = "Broken";
                            } else if (clouds >= 0.4) {
                                clouds = "Scattered";
                            } else if (clouds >= 0) {
                                clouds = "Clear";
                            } else {
                                clouds = "Butt";
                            }

                            response += "The clouds are currently " + clouds;
                            response += " with " + precip_type + ". ";
                            response += accumulation + "in accumulation.\n";
                            response += "Visibility is currently " + current_vis;
                            response += "miles.";

                            // Alerts
                            if (data.alerts != null) {
                                for (i = 0; i < data.alerts.length; i++) {
                                    elem = data.alerts[i];
                                    response += "\nAlert: " + elem.title;
                                }
                            }

                            bot.message(response);
                        }
                    });
                }
            });
        } else {
          bot.message("Thank you.")
        }
    }
});

bot.serve(process.env['PORT'] || 3000);
