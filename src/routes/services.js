const express = require("express");
const router = express.Router();
const { accounts, writeJSON } = require("../data");

// transfer page
router.get("/transfer", (request, response) => {
  response.render("transfer");
});

router.post("/transfer", (request, response) => {
  const from = request.body.from;
  const to = request.body.to;
  const amount = request.body.amount;

  accounts[from].balance -= amount;
  accounts[to].balance += parseInt(amount, 10);

  writeJSON();

  response.render("transfer", { message: "Transfer Completed" });
});

// payment page
router.get("/payment", (request, response) => {
  response.render("payment", {
    account: accounts.credit,
  });
});

router.post("/payment", (request, response) => {
  const amount = request.body.amount;

  accounts.credit.balance -= amount;
  accounts.credit.available += parseInt(amount, 10);

  writeJSON();

  response.render("payment", {
    message: "Payment Successful",
    account: accounts.credit,
  });
});

module.exports = router;
