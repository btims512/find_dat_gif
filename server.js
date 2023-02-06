const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const key = process.env.API_KEY;
const $fetch = require("node-fetch");

app.use(express.static(__dirname + "/public"));
const baseUrl = `https://api.giphy.com/`;

const { response } = require("express");
const { render } = require("ejs");

// trending GIFs home page //
app.get("/", (req, res) => {
  let endpoint = `${baseUrl}v1/gifs/trending?api_key=${key}&limit=25`;
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
    `${baseUrl}v1/gifs/search?q=${searchInput}&limit=25&api_key=${key}&offset=25`
  )
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

// Random Page //
app.get("/random", (req, res) => {
  let endpoint =
    "https://api.giphy.com/v1/gifs/random?api_key=Sd6Qp7OHdPXtMIUXPvOSsZeBVWSl5xA6";
  $fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      let randomArray = [];
      randomArray.forEach((data) => {
        randomArray.push(data.images.fixed_height_downsampled.url);
      });
      res.render("random.ejs", { data: randomArray });
      console.log(data);
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
