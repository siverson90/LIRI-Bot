# LIRI-Bot

Node.js CLI app that allows users to interact with 3 API's including: Spotify, Twitter and OMDB (IMDB's api).

## Getting Started

```
1. Clone repo down to local machine
https://github.com/siverson90/LIRI-Bot.git

```

### Installing


```
1. Run NPM Install to install dependencies

2. Open terminal in root folder: Lili-Bot

3. To run app enter: 
  1. node lili.js my-tweets
  2. node lili.js spotify-this-song (song title of your choice)
  3. node lili.js movie-this (movie title of your choice)
```


**Input:** 
```
node lili.js my-tweets
```

**Output:** 
```
Sat Nov 18 01:18:26 +0000 2017
Braxton Winston was the center of a dramatic photo of a protest after a man was shot by police. Soon, he'll be join… https://t.co/n2Ivu2UsxL
====================
Sat Nov 18 01:16:00 +0000 2017
RT @OutFrontCNN: "It's as if the D.C. media bubble thinks that the people of Alabama are not capable of making their own decision with the…
```


**Input:** 
```
node lili.js spotify-this-song banana-pancakes
```
**Output**: 
```
Artists name is-Jack Johnson
Song's Name: Banana Pancakes
The url for the song is https://open.spotify.com/track/451GvHwY99NKV4zdKPRWmv
The Alubm is: In Between Dreams

================================

Artists name is-Billy Currington
Song's Name: Banana Pancakes
The url for the song is https://open.spotify.com/track/7B1qzMdyg0NnqNmRCLqbRs
The Alubm is: We Are Tonight

================================

```

**Input:** 
```
node lili.js movie-this The Matrix
```
**Output**: 
```
Movie Title: The Matrix
Movie released in 1999
IMDB gave The Matrixa rating of 8.7/10 vs. Rotten tomatoes gave a rating of 87%
The Matrix was produced in USA
The Matrix is in English
Here is the plot of The Matrix: A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.
The Matrix stars Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving
```

## Built With

* [Node.js](https://nodejs.org/en/) - Open source server framework
* [Twitter NPM](https://www.npmjs.com/package/twitter) - An asynchronous client library for the Twitter REST and Streaming API's.
* [Node-Spotify-api](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [request](https://www.npmjs.com/package/request) - Request is designed to be the simplest way possible to make http calls.
* [File-system](https://www.npmjs.com/package/file-system) - This module make file opertaion apis simple, you don't need to care the dir exits. and the api is same as node's filesystem.
*  [ NPM](https://www.npmjs.com/) - npm is the package manager for JavaScript and the world’s largest software registry.

## Authors

* **Josh Siverson** - https://josh-siverson.herokuapp.com/

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

