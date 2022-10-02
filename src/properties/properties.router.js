const router = require("express").Router();
const controller = require("./properties.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/:properties_id").get(controller.read).put(controller.updateStatus)
router.route("/").get(controller.list).post(controller.create)

module.exports = router;