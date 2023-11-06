const router = require("express").Router();
const {
  getAllThoughts,
  getOneThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
} = require("../../controllers/thoughtController");


router.route("/").get(getAllThoughts).post(createThought);


router
  .route("/:thoughtId")
  .get(getOneThoughtById)
  .put(updateThought)
  .delete(deleteThought);


router.route("/:thoughtId/reactions").put(addReaction);

module.exports = router;