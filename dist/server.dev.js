"use strict";

var express = require("express"); // to be able to use express module //


var app = express(); // declaring express app as a variable to use //

var dotenv = require("dotenv").config(); //using dotenv file to hide my API key//


var key = process.env.API_KEY; //how I hide my API key//
//API key for grading purposes 'Sd6Qp7OHdPXtMIUXPvOSsZeBVWSl5xA6'

var $fetch = require("node-fetch"); //node-fetch module//


app.use(express["static"](__dirname + "/public")); //for locating my css file//

var baseUrl = "https://api.giphy.com/"; //this is the base of the url that is always going to be the begining of the URI path //

var _require = require("express"),
    response = _require.response; // the response method will require express app //


var _require2 = require("ejs"),
    render = _require2.render; // setting the default rendering method to require EJS format //
// trendig GIFs home page //


app.get("/", function (req, res) {
  // this page displays trending gifs on load //
  var endpoint = "".concat(baseUrl, "v1/gifs/trending?api_key=").concat(key, "&limit=25"); // setting the endpoint Calling on the base URL then navigating to trending //

  $fetch(endpoint) // Using the fetch command to call on the endpoint //
  .then(function (response) {
    // This is a promise based action that will follow after fetch is complete //
    if (!response.ok) {
      // if the response is NOT ok, then respond with error below
      throw Error(response.statusText); //console logged to double check if there was error, returns false //
    } //previously I had not set somethig to catch for an error which was allowing any error to come through //


    console.log(!response.ok); // double checking for error //

    return response.json(); // return what has been fetched in json format //
  }).then(function (data) {
    // Another promise to be for filled after checking for errors //
    var gifArray = []; // Declaring an empty array for the data to be passed into //

    data.data.forEach(function (element) {
      // Looping through each element of the data.data API info and making it in a function //
      gifArray.push(element.images.fixed_height.url); // Here I'm pushing the data from the API into the empty array I declared on line 31 //
    });
    res.render("home.ejs", {
      data: gifArray
    }); // rendering the data from the gifArray to my home.ejs file //
  })["catch"](function (error) {
    return console.error("Error from network: ", error);
  }); // looking to catch any network errors from the above code and console loggig them //
}); // search page //

app.get("/search", function (req, res) {
  // app.get command to localhost:4000/search page //
  var searchInput = req.query.search; // declearing the variable 'searchInput' to take whatever the user inputs to be used as the search query //

  $fetch( // similiar to last time but fetching the search portion of the API //
  "".concat(baseUrl, "v1/gifs/search?q=").concat(searchInput, "&limit=25&api_key=").concat(key, "&offset=25") // using the searchInput data added by user to search the data base aka API //
  ).then(function (res) {
    return res.json();
  }) // promise to return it as json again //
  .then(function (data) {
    // promise to take data into this decleared function //
    var searchArray = []; // declearing an empty array to place data in once again //

    data.data.forEach(function (element) {
      // looping or checkig each element in the data.data //
      searchArray.push(element.images.fixed_height.url); // afterwards pushig the data from data.data into the searchArray as well as adding images and height preferences //
    });
    res.render("results.ejs", {
      data: searchArray
    }); // rendering the data from the searchArray to my results.ejs file //
  })["catch"](function (error) {
    return console.error("Error from network: ", error);
  }); // looking to catch any network errors from the above code and console loggig them //
});
var port = process.env.PORT || 4000; // set to render on port 4000 //

app.listen(port, function () {
  return console.log("App listening on port: ".concat(port));
}); // app is listening on port 4000 and settig a console log message //