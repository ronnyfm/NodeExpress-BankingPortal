const fs = require("fs");
const path = require("path");
const express = require("express");
const port = 3000;

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const accountData = fs.readFileSync(
  path.join(__dirname, "json", "accounts.json"),
  "utf8"
);
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
  path.join(__dirname, "json", "users.json"),
  "utf8"
);
const users = JSON.parse(userData);

// index page
app.get("/", (request, response) => {
  response.render("index", {
    title: "Account Summary",
    accounts: accounts,
  });
});

// savings page
app.get("/savings", (request, response) => {
  response.render("account", {
    account: accounts.savings,
  });
});

// checking page
app.get("/checking", (request, response) => {
  response.render("account", {
    account: accounts.checking,
  });
});

// credit page
app.get("/credit", (request, response) => {
  response.render("account", {
    account: accounts.credit,
  });
});

// profile page
app.get("/profile", (request, response) => {
  response.render("profile", {
    user: users[0],
  });
});

// transfer page
app.get("/transfer", (request, response) => {
  response.render("transfer");
});

app.post("/transfer", (request, response) => {
  const from = request.body.from;
  const to = request.body.to;
  const amount = request.body.amount;

  accounts[from].balance -= amount;
  accounts[to].balance += parseInt(amount, 10);

  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(
    path.join(__dirname, "json", "accounts.json"),
    accountsJSON,
    "utf8"
  );

  response.render("transfer", { message: "Transfer Completed" });
});

// payment page
app.get("/payment", (request, response) => {
  response.render("payment", {
    account: accounts.credit,
  });
});

app.post("/payment", (request, response) => {
    const amount = request.body.amount;
    
    accounts.credit.balance -= amount;
    accounts.credit.available += parseInt(amount, 10);
    
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(
        path.join(__dirname, "json", "accounts.json"),
        accountsJSON,
        "utf8"
    );
    
    response.render("payment", { message: "Payment Successful", account: accounts.credit });
});

app.listen(port, () => {
  console.log(`PS Project Running on port ${port}!`);
});
