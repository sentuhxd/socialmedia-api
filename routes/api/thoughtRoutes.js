const router = require("express").Router();
const {
  getAllThoughts,
  getOneThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtid
router
  .route("/:thoughtId")
  .get(getOneThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtid/reactions
router.route("/:thoughtId/reactions").put(addReaction);

module.exports = router;