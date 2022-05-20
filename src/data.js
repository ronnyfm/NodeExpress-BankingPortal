const fs = require("fs");
const path = require("path");

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

const writeJSON = () => {
  fs.writeFileSync(
    path.join(__dirname, "json", "accounts.json"),
    JSON.stringify(accounts),
    "utf8"
  );
}

module.exports = {
    accounts,
    users,
    writeJSON,
}