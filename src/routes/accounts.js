const express = require("express");
const router = express.Router();
const { accounts } = require("../data");

// savings page
router.get("/savings", (request, response) => {
  response.render("account", {
    account: accounts.savings,
  });
});

// checking page
router.get("/checking", (request, response) => {
  response.render("account", {
    account: accounts.checking,
  });
});

// credit page
router.get("/credit", (request, response) => {
  response.render("account", {
    account: accounts.credit,
  });
});

module.exports = router;
