const path = require("path");
const express = require("express");
const { accounts, users, writeJSON } = require("./data.js");
const accountRoutes = require("./routes/accounts.js");
const servicesRoutes = require("./routes/services.js");
const port = 3000;

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// index page
app.get("/", (request, response) => {
  response.render("index", {
    title: "Account Summary",
    accounts: accounts,
  });
});

app.use("/account", accountRoutes);
app.use("/services", servicesRoutes);

// profile page
app.get("/profile", (request, response) => {
  response.render("profile", {
    user: users[0],
  });
});

app.listen(port, () => {
  console.log(`PS Project Running on port ${port}!`);
});
