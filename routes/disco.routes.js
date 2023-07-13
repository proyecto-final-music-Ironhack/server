const router = require("express").Router();
const Disco = require("../models/Disco.model");
const dataDiscos = require("../data.json");
const discoController = require("../controllers/disco.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//POST CREATE DISCOS
router.post("/create-list", discoController.createList);

//POST CREATE DISCO
router.post("/create", discoController.create);

//GET LIST
router.get("/", discoController.list);

//GET ID
router.get("/:id", isAuthenticated, discoController.detail);

//PUT UPDATE DISCO
router.put("/:id", discoController.update);

//PUT UPDATE FOLLOWERS
router.put("/:id/add-follower", discoController.addFollower);
router.put("/:id/remove-follower", discoController.removeFollower);

//DELETE DISCO
router.delete("/:id/delete", discoController.delete);

module.exports = router;
