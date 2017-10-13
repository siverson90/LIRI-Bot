var twitterKeys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});

// console.log(twitterKeys);

// Comands for LIRI
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

var request = require("request");

var userRequest = process.argv[2];
var userInput = process.argv;
var separatedUserInput ="";

switch(userRequest){
  case "my-tweets":
    console.log("twitter");
    twitter();
    break;
  case "spotify-this-song":
    console.log("spotify");
    userInputSeparated(userInput);
    spotify(separatedUserInput);
    break;
  case "movie-this":
    console.log("imdb");
    userInputSeparated(userInput)
    imdb(separatedUserInput);
    break;
  case "do-what-it-says":
    console.log("last song");
    // run the spotfy song
    break;
}

function twitter(){

  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
});

}

function userInputSeparated(searchTerm){

  console.log(searchTerm);

  for ( var i = 3; i < searchTerm.length; i++) {

    if (i > 3 && i < searchTerm.length) {
      separatedUserInput = separatedUserInput + "+" + searchTerm[i];

    } else {
      separatedUserInput += searchTerm[i]; 
    }

  }
  // console.log("this is the separated user input " + separatedUserInput);
  return separatedUserInput;
}

function spotify(songTitle){

  var spotify = new Spotify({
    id: "2183c528246541b1838b6be6e54483cd",
    secret: "8bfd5409cbe54f24941d130e78b6c6d4"
  });
   
   // var spotifyUrl ='https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx'


  spotify.search({ type: 'track', query: 'all the small things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } else {
  // NEED to do JSON.parse
  var spotifyObj = data;
  console.log(spotifyObj);
  // returns total data
  // get tracks
  var spotifyList = spotifyObj.tracks;
  // console.log(spotifyList);
  var lengthOfSpotifyList = spotifyList.items
  console.log(lengthOfSpotifyList.length);
  console.log(lengthOfSpotifyList)

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from


    for ( var i = 0; i < lengthOfSpotifyList.length; i++) {
      console.log(lengthOfSpotifyList[i].artists[0].name);

    }   

  }
  })
};

function imdb(movieTitle){

  var queryurl = "http://www.omdbapi.com/?t="+ movieTitle + "&apikey=40e9cece"

  console.log("this is the queryUrl " + queryurl);

  request(queryurl, function(error, response, body) {
    if (!error && response.statusCode === 200){
      var imdbObj = JSON.parse(body)
      // console.log(imdbObj);
      var title = imdbObj.Title;
      var year = imdbObj.Year;
      var imdbRating = imdbObj.Ratings[0].Value;
      var rottenTomatoe = imdbObj.Ratings[1].Value;
      var countryProduced = imdbObj.Country;
      var language = imdbObj.Language;
      var plot = imdbObj.Plot;
      var actors = imdbObj.Actors;
      console.log("Movie Title: " + title);
      console.log("Movie released in " + year);
      console.log("IMDB gave " + title + "a rating of " + imdbRating + " vs. " + "Rotten tomatoes gave a rating of " + rottenTomatoe);
      console.log(title + " was produced in "+ countryProduced);
      console.log(title + " is in "+ language);
      console.log("Here is the plot of "+ title + ": " + plot);
      console.log(title + " stars " + actors);
   
    }
    else {
      console.log("didnt work" + error);
    }
  })
};
