const router = require("express").Router();
const controller = require("./properties.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/").get(controller.list)

module.exports = router;