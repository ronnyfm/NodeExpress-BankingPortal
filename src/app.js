const fs = require("fs");
const path = require("path");
const express = require("express");
const port = 3000;

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// index page
app.get("/", (request, response) => {
  response.render("index", {title: "Index"});
});

app.listen(port, () => {
  console.log(`PS Project Running on port ${port}}!`);
});
