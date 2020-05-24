const express = require("express");
const bodyParser = require("body-parser");
const promotionIdRouter = express.Router();
promotionIdRouter.use(bodyParser.json());
promotionIdRouter.route("/:proId")

