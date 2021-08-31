const express = require("express"); // to be able to use express module //
const app = express(); // declaring express app as a variable to use //
const dotenv = require("dotenv").config(); //using dotenv file to hide my API key//
const key = process.env.API_KEY; //how I hide my API key//
//API key for grading purposes 'Sd6Qp7OHdPXtMIUXPvOSsZeBVWSl5xA6'

const $fetch = require("node-fetch"); //node-fetch module//

app.use(express.static(__dirname + "/public")); //for locating my css file//

const baseUrl = `https://api.giphy.com/`; //this is the base of the url that is always going to be the begining of the URI path //

const { response } = require("express"); // the response method will require express app //
const { render } = require("ejs"); // setting the default rendering method to require EJS format //

// trendig GIFs home page //
app.get("/", (req, res) => {
  // this page displays trending gifs on load //
  let endpoint = `${baseUrl}v1/gifs/trending?api_key=${key}&limit=25`; // setting the endpoint Calling on the base URL then navigating to trending //
  $fetch(endpoint) // Using the fetch command to call on the endpoint //
    .then((response) => {
      // This is a promise based action that will follow after fetch is complete //
      if (!response.ok) {
        // if the response is NOT ok, then respond with error below
        throw Error(response.statusText); //console logged to double check if there was error, returns false //
      } //previously I had not set somethig to catch for an error which was allowing any error to come through //
      return response.json(); // return what has been fetched in json format //
    })
    .then((data) => {
      // Another promise to be for filled after checking for errors //
      let gifArray = []; // Declaring an empty array for the data to be passed into //
      data.data.forEach((element) => {
        // Looping through each element of the data.data API info and making it in a function //
        gifArray.push(element.images.fixed_height.url); // Here I'm pushing the data from the API into the empty array I declared on line 31 //
      });
      res.render("home.ejs", { data: gifArray }); // rendering the data from the gifArray to my home.ejs file //
    })
    .catch((error) => console.error("Error from network: ", error)); // looking to catch any network errors from the above code and console loggig them //
});

// search page //
app.get("/search", (req, res) => {
  // app.get command to localhost:4000/search page //
  let searchInput = req.query.search; // declearing the variable 'searchInput' to take whatever the user inputs to be used as the search query //
  $fetch(
    // similiar to last time but fetching the search portion of the API //
    `${baseUrl}v1/gifs/search?q=${searchInput}&limit=25&api_key=${key}&offset=25` // using the searchInput data added by user to search the data base aka API //
  )
    .then((res) => res.json()) // promise to return it as json again //
    .then((data) => {
      // promise to take data into this decleared function //
      let searchArray = []; // declearing an empty array to place data in once again //
      data.data.forEach((element) => {
        // looping or checkig each element in the data.data //
        searchArray.push(element.images.fixed_height.url); // afterwards pushig the data from data.data into the searchArray as well as adding images and height preferences //
      });
      res.render("results.ejs", { data: searchArray }); // rendering the data from the searchArray to my results.ejs file //
    })
    .catch((error) => console.error("Error from network: ", error)); // looking to catch any network errors from the above code and console loggig them //
});

// Random Page //
app.get("/random", (req, res) => {
  // app.get command to localhost:4000/search page //
  let searchInput = req.query.search; // declearing the variable 'searchInput' to take whatever the user inputs to be used as the search query //
  $fetch(
    // similiar to last time but fetching the search portion of the API //
    `api.giphy.com/v1/gifs/random?api_key=${key}` // using the searchInput data added by user to search the data base aka API //
  )
    .then((res) => res.json()) // promise to return it as json again //
    .then((data) => {
      // promise to take data into this decleared function //
      let searchArray = []; // declearing an empty array to place data in once again //
      data.data.forEach((element) => {
        // looping or checkig each element in the data.data //
        searchArray.push(element.images.fixed_height.url); // afterwards pushig the data from data.data into the searchArray as well as adding images and height preferences //
      });
      res.render("results.ejs", { data: searchArray }); // rendering the data from the searchArray to my results.ejs file //
    })
    .catch((error) => console.error("Error from network: ", error)); // looking to catch any network errors from the above code and console loggig them //
});

// Categories Page //
app.get("/categories", (req, res) => {
  let endpoint = `${baseUrl}v1/gifs/categories?api_key=${key}`;
  $fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json(); // return what has been fetched in json format //
    })
    .then((data) => {
      let gifArray = [];
      data.forEach((element) => {
        gifArray.push(element.images.fixed_height.url);
      });
      res.render("categories.ejs", { data: gifArray }); // rendering the data from the gifArray to my home.ejs file //
    })
    .catch((error) => console.error("Error from network: ", error));
});

// About Page //
app.get("/about", (req, res) => {
  res.render("about.ejs"); // rendering the data from the gifArray to my home.ejs file //
});

// Contact Page //
app.get("/contact", (req, res) => {
  let endpoint = `${baseUrl}v1/gifs/categories?api_key=${key}`;
  $fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json(); // return what has been fetched in json format //
    })
    .then((data) => {
      let gifArray = [];
      data.forEach((element) => {
        gifArray.push(element.images.fixed_height.url);
      });
      res.render("contact.ejs", { data: gifArray }); // rendering the data from the gifArray to my home.ejs file //
    })
    .catch((error) => console.error("Error from network: ", error));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App listening on port: ${port}`));
