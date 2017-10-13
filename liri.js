// var twitterKeys = require("./keys.js");
// var spotify = require('node-spotify-api');

// Comands for LIRI
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

var request = require("request");

var userRequest = process.argv[2];
var userInput = process.argv[3];

switch(userRequest){
  case "my-tweets":
    console.log("twitter");
    // create twitter function;
    break;
  case "spotify-this-song":
    console.log("spotify");
    // create spotify
    break;
  case "movie-this":
    console.log("imdb");
    imdb();
    break;
  case "do-what-it-says":
    console.log("last song");
    // run the spotfy song
    break;
}

// function twitter(){}

// function spotify(){}

function imdb(){

  var queryurl = "http://www.omdbapi.com/?t="+ userInput + "&apikey=40e9cece"

  request(queryurl, function(error, response, body) {
    if (!error && response.statusCode === 200){
      var imdbObj = JSON.parse(body)
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
    else{
      console.log("didnt work" + error);
    }
  })
}