const express = require("express");
const app = express();
const dotenv = require("dotenv").config(); //using dotenv file to hide my API key//
const key = process.env.API_KEY;

const $fetch = require("node-fetch");

app.use(express.static(__dirname + "/public")); //for locating css file//

const baseUrl = `https://api.giphy.com/`;

const { response } = require("express"); // requires express app //
const { render } = require("ejs"); // default rendering method //

// trending GIFs home page //
app.get("/", (req, res) => {
  // page displays trending gifs on load //
  let endpoint = `${baseUrl}v1/gifs/trending?api_key=${key}&limit=25`; // navigating to trending //
  $fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      let gifArray = [];
      data.data.forEach((element) => {
        gifArray.push(element.images.fixed_height.url);
      });
      res.render("home.ejs", { data: gifArray });
    })
    .catch((error) => console.error("Error from network: ", error));
});

// search page //
app.get("/search", (req, res) => {
  let searchInput = req.query.search;
  $fetch(
    `${baseUrl}v1/gifs/search?q=${searchInput}&limit=25&api_key=${key}&offset=25` // using the searchInput data added by user to search the data base aka API //
  )
    .then((res) => res.json())
    .then((data) => {
      let searchArray = [];
      data.data.forEach((element) => {
        // looping/checking each element in the data.data //
        searchArray.push(element.images.fixed_height.url);
      });
      res.render("results.ejs", { data: searchArray });
    })
    .catch((error) => console.error("Error from network: ", error));
});

// Random Page //
app.get("/random", (req, res) => {
  let searchInput = req.query.search;
  $fetch(`api.giphy.com/v1/gifs/random?api_key=${key}`)
    .then((res) => res.json())
    .then((data) => {
      let searchArray = [];
      data.data.forEach((element) => {
        searchArray.push(element.images.fixed_height.url);
      });
      res.render("results.ejs", { data: searchArray });
    })
    .catch((error) => console.error("Error from network: ", error));
});

// Categories Page //
app.get("/categories", (req, res) => {
  let endpoint = `${baseUrl}v1/gifs/categories?api_key=${key}`;
  $fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      let gifArray = [];
      data.forEach((element) => {
        gifArray.push(element.images.fixed_height.url);
      });
      res.render("categories.ejs", { data: gifArray });
    })
    .catch((error) => console.error("Error from network: ", error));
});

// About Page //
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// Contact Page //
app.get("/contact", (req, res) => {
  let endpoint = `${baseUrl}v1/gifs/categories?api_key=${key}`;
  $fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      let gifArray = [];
      data.forEach((element) => {
        gifArray.push(element.images.fixed_height.url);
      });
      res.render("contact.ejs", { data: gifArray });
    })
    .catch((error) => console.error("Error from network: ", error));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App listening on port: ${port}`));
