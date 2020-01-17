const express = require("express");
const router = express.Router();

const CustomersController = require('../controllers/customers');

router.post("/", CustomersController .add_customer);
router.get("/:userId", CustomersController .get_customers);

module.exports = router;
