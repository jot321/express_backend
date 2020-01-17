const express = require("express");
const router = express.Router();

const TransactionsController = require('../controllers/transactions');

router.post("/", TransactionsController.add_transaction);
router.get("/:trainerId", TransactionsController.get_transactions);

module.exports = router;
