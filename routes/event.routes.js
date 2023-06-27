const router = require("express").Router();
const Event = require("../models/Event.model");
const eventController = require("../controllers/event.controller");

//POST CREATE EVENT
router.post("/create", eventController.create);

//GET LIST
router.get("/", eventController.list);

//GET ID
router.get("/:id", eventController.detail);

//PUT UPDATE EVENT

router.put("/:id", eventController.update);

// DELETE EVENT
router.delete("/:id/delete", eventController.delete);

module.exports = router;
