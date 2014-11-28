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
var shorten_me = require('short-url');

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
    		var humanSearchTerm = tokens.join(' ');
    		var searchTerm = escape(tokens.join('+'));

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
            var searchTerm = tokens[0].toUpperCase();

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
            var msg = message.text.split(" ");
            msg = _.without(msg, 'felicia', 'say');
            bot.message(msg.join(" "));
        } else if (helper.check( "felicia short url", tokens )) {
            var msg = message.text.split(" ");
            msg = _.without(msg, 'felicia', 'short', 'url');
            var givenURL = msg[0];

            shorten_me.shorten(givenURL, function(err, url) {
                bot.message(url);
            });
        } else if (helper.check( "felicia weather me", tokens )) {
            tokens = _.without(tokens, 'felicia', 'weather', 'me');
            var searchLoc = tokens.join(" ");
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

                            var current_weather = data.currently.summary;
                            var precip_type = "no precipitation";
                            var current_temp = data.currently.apparentTemperature;
                            var wind_speed = data.currently.windSpeed;
                            var wind_bearing = data.currently.windBearing;
                            var clouds = data.currently.cloudCover;
                            var current_vis = data.currently.visibility;

                            // Precipitation types
                            if (data.currently.precipIntensity > 0) {
                                precip_type = data.currently.precipType;
                            }

                            var response = "Now: " + current_weather;
                            response += ", Temp: " + current_temp + "F.\n";
                            response += "Wind: " + wind_speed + "mph @ ";
                            response += wind_bearing + ". Visibility: ";
                            response += current_vis + " miles.\n";

                            if (clouds >= 1) {
                                clouds = "overcast";
                            } else if (clouds >= 0.75) {
                                clouds = "broken";
                            } else if (clouds >= 0.4) {
                                clouds = "scattered";
                            } else if (clouds >= 0) {
                                clouds = "clear";
                            } else {
                                clouds = "butt";
                            }

                            response += "Clouds are currently " + clouds;
                            response += " with " + precip_type + ". ";

                            if (data.daily.precipType === "snow") {
                                var accumulation = data.daily.precipAccumulation;

                                if (!accumulation === "undefined") {
                                    response += accumulation + " inches expected.";
                                }
                            }

                            // Alerts
                            if (data.alerts != null) {
                                for (i = 0; i < data.alerts.length; i++) {
                                    var elem = data.alerts[i];
                                    response += "\nWeather Alert: " + elem.title;

                                    var shortenedURL = null;

                                    shorten_me.shorten(elem.uri, function(err, url) {
                                        shortenedURL = url;
                                        console.log(url);

                                        response += "\n[ More: " + shortenedURL + " ]";

                                        if (response.length > 450) {
                                            response = response.substring(0, 439) + " (cont) ...";
                                        }

                                        bot.message(response);
                                    });
                                }
                            } else {
                                if (response.length > 450) {
                                    response = response.substring(0, 439) + " (cont) ...";
                                }

                                bot.message(response);
                            }
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
