
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
    renderTweets();
    break;
  case "spotify-this-song":
    // console.log("spotify");
    userInputSeparated(userInput);
    renderSpotify(separatedUserInput);
    break;
  case "movie-this":
    // console.log("imdb");
    userInputSeparated(userInput)
    renderImdb(separatedUserInput);
    break;
  case "do-what-it-says":
    console.log("last song");
    readRandomTxt();

    break;
}

// ****FUNCTIONS*******

// render 
function renderTweets() {

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
    }
  });
};

// Takes input after command and formats to be separated by "+"
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

// Render artist and song details 
function renderSpotify(songSearch) {
  // spotify keys
  var spotify = new Spotify({
    id: "2183c528246541b1838b6be6e54483cd",
    secret: "8bfd5409cbe54f24941d130e78b6c6d4"
  });
   // If nothing is entered into command line use "The Sign"
   if(songSearch.length == 0) {
    // console.log("works");
    songSearch = "The Sign";
   }

   // When user enters in song title,
  spotify.search({ type: 'track', query: songSearch }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);

  } else {
  // NEED to do JSON.parse
  var spotifyObj = data;

  // Gets tracks asssociated with song name
  var spotifyList = spotifyObj.tracks;

  //return list for iteration in FOR loop below 
  var lengthOfSpotifyList = spotifyList.items

      // iterate through each item and console in desired format
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

// Render movie details
function renderImdb(movieTitle){
  // If no movie entered show "Mr Nobody"
  if (movieTitle.length == 0) {
    var queryurl = "http://www.omdbapi.com/?t=mr+nobody&apikey=40e9cece"

  }
  else {
    var queryurl = "http://www.omdbapi.com/?t="+ movieTitle + "&apikey=40e9cece"
  }
    // print to screen in desired formation
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

//Take string from random.txt and send through spotify function 
function readRandomTxt(){
  fs.readFile("random.txt", "utf8", function(error,data){
    if(error) {
      return console.log("error");
    }
    
    console.log("From the randomtext " + data);
    var splitData = data.split(" ");
    console.log(splitData);
    var commandArray = splitData.splice(0,1);
    console.log(commandArray);
    console.log(splitData);

    var commandtoString = commandArray.toString();
    console.log(commandtoString);

    if (commandtoString === "my-tweets") {
      renderTweets();
    }
    else if( commandtoString === "spotify-this-song") {
      var joinedString = splitData.join();
      console.log(joinedString);
      var fromText= joinedString.replace(/,/g , ",");
      console.log(fromText);
 
      renderSpotify(fromText);
    }
    else if(commandtoString === "movie-this"){
      var joinedString = splitData.join();
      console.log(joinedString);
      var fromText= joinedString.replace(/,/g , "+");
      console.log(fromText);
 
      renderImdb(fromText);
    }

    else {console.log("Broken")}

  })
}
