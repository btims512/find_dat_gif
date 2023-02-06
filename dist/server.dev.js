"use strict";

var express = require("express");

var app = express();

var dotenv = require("dotenv").config();

var key = process.env.API_KEY;

var $fetch = require("node-fetch");

app.use(express["static"](__dirname + "/public"));
var baseUrl = "https://api.giphy.com/";

var _require = require("express"),
    response = _require.response;

var _require2 = require("ejs"),
    render = _require2.render; // trending GIFs home page //


app.get("/", function (req, res) {
  var endpoint = "".concat(baseUrl, "v1/gifs/trending?api_key=").concat(key, "&limit=25");
  $fetch(endpoint).then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  }).then(function (data) {
    var gifArray = [];
    data.data.forEach(function (element) {
      gifArray.push(element.images.fixed_height.url);
    });
    res.render("home.ejs", {
      data: gifArray
    });
  })["catch"](function (error) {
    return console.error("Error from network: ", error);
  });
}); // search page //

app.get("/search", function (req, res) {
  var searchInput = req.query.search;
  $fetch("".concat(baseUrl, "v1/gifs/search?q=").concat(searchInput, "&limit=25&api_key=").concat(key, "&offset=25")).then(function (res) {
    return res.json();
  }).then(function (data) {
    var searchArray = [];
    data.data.forEach(function (element) {
      searchArray.push(element.images.fixed_height.url);
    });
    res.render("results.ejs", {
      data: searchArray
    });
  })["catch"](function (error) {
    return console.error("Error from network: ", error);
  });
}); // Random Page //

app.get("/random", function (req, res) {
  var endpoint = "https://api.giphy.com/v1/gifs/random?api_key=Sd6Qp7OHdPXtMIUXPvOSsZeBVWSl5xA6";
  $fetch(endpoint).then(function (res) {
    return res.json();
  }).then(function (data) {
    var randomArray = [];
    randomArray.forEach(function (data) {
      randomArray.push(data.images.fixed_height_downsampled.url);
    });
    res.render("random.ejs", {
      data: randomArray
    });
    console.log(data);
  })["catch"](function (error) {
    return console.error("Error from network: ", error);
  });
}); // Categories Page //

app.get("/categories", function (req, res) {
  var endpoint = "".concat(baseUrl, "v1/gifs/categories?api_key=").concat(key);
  $fetch(endpoint).then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  }).then(function (data) {
    var gifArray = [];
    data.forEach(function (element) {
      gifArray.push(element.images.fixed_height.url);
    });
    res.render("categories.ejs", {
      data: gifArray
    }); // rendering the data from the gifArray to my home.ejs file //
  })["catch"](function (error) {
    return console.error("Error from network: ", error);
  });
}); // About Page //

app.get("/about", function (req, res) {
  res.render("about.ejs"); // rendering the data from the gifArray to my home.ejs file //
}); // Contact Page //

app.get("/contact", function (req, res) {
  var endpoint = "".concat(baseUrl, "v1/gifs/categories?api_key=").concat(key);
  $fetch(endpoint).then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json(); // return what has been fetched in json format //
  }).then(function (data) {
    var gifArray = [];
    data.forEach(function (element) {
      gifArray.push(element.images.fixed_height.url);
    });
    res.render("contact.ejs", {
      data: gifArray
    }); // rendering the data from the gifArray to my home.ejs file //
  })["catch"](function (error) {
    return console.error("Error from network: ", error);
  });
});
var port = process.env.PORT || 4000;
app.listen(port, function () {
  return console.log("App listening on port: ".concat(port));
});