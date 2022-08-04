const express = require("express");
const router = express.Router();

const {
  getAllEntidades,
} = require("../controllers/entidades");

router.route("/").get(getAllEntidades);

module.exports = router;
