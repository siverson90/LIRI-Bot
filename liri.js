
// Variables
var twitterKeys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});


var request = require("request");

var userRequest = process.argv[2];
var userInput = process.argv;
var separatedUserInput = "";

switch(userRequest){
  case "my-tweets":
    console.log("twitter");
    twitter();
    break;
  case "spotify-this-song":
    // console.log("spotify");
    userInputSeparated(userInput);
    spotify(separatedUserInput);
    break;
  case "movie-this":
    // console.log("imdb");
    userInputSeparated(userInput)
    imdb(separatedUserInput);
    break;
  case "do-what-it-says":
    console.log("last song");
    readRandomTxt();

    break;
}

// ****FUNCTIONS*******

// finds last 20 tweets for screenname
function twitter() {

  //parms used to capture screen name of account 
  var params = {screen_name: 'CNN'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    // If valited response console result in formatt
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("====================")
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
      }
      else {
        throw error;
      }
    }
  });
};

// Takes string after command and formats to be separated by "+"
function userInputSeparated(searchTerm) {

  // loop through length of input and insert "+"
  for ( var i = 3; i < searchTerm.length; i++) {
    // Don't want a "+"sign before first word
    if (i > 3 && i < searchTerm.length) {
      separatedUserInput = separatedUserInput + "+" + searchTerm[i];

    } else {
      separatedUserInput += searchTerm[i]; 
    }

  }
  // writes to global variable for other functions to call on
  return separatedUserInput;
};

// Takes
function spotify(songSearch){

  var spotify = new Spotify({
    id: "2183c528246541b1838b6be6e54483cd",
    secret: "8bfd5409cbe54f24941d130e78b6c6d4"
  });
   
   // var spotifyUrl ='https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx'
   if(songSearch.length == 0) {
    // console.log("works");
    songSearch = "The Sign";
   }

  spotify.search({ type: 'track', query: songSearch }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } else {
  // NEED to do JSON.parse
  var spotifyObj = data;
  // console.log(spotifyObj);
  // returns total data
  // get tracks
  var spotifyList = spotifyObj.tracks;
  // console.log(spotifyList);
  var lengthOfSpotifyList = spotifyList.items
  // console.log(lengthOfSpotifyList.length);
  // console.log(lengthOfSpotifyList)

    for ( var i = 0; i < lengthOfSpotifyList.length; i++) {
      console.log("")
      console.log("Artists name is-" + lengthOfSpotifyList[i].artists[0].name);
      console.log("Song's Name: " + lengthOfSpotifyList[i].name);
      console.log("The url for the song is "+ lengthOfSpotifyList[i].external_urls.spotify);
      console.log("The Alubm is: "+ lengthOfSpotifyList[i].album.name)
      console.log("")
      console.log("================================")
    }   

  }
  })
};

function imdb(movieTitle){

  if (movieTitle.length == 0) {
    var queryurl = "http://www.omdbapi.com/?t=mr+nobody&apikey=40e9cece"

  }
  else {
    var queryurl = "http://www.omdbapi.com/?t="+ movieTitle + "&apikey=40e9cece"
  }

    // console.log("this is the queryUrl " + queryurl);

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

function readRandomTxt(){
  fs.readFile("random.txt", "utf8", function(error,data){
    if(error) {
      return console.log("error");
    }
    
    console.log("From the randomtext " + data);
    var splitData = data.split(" ");
    console.log(splitData);
    splitData.splice(0,1);
    console.log(splitData)
    var joinedString = splitData.join();
    console.log(joinedString);
    var fromText= joinedString.replace(/,/g , ",");
    console.log(fromText);
 
    spotify(fromText);

  })
}
